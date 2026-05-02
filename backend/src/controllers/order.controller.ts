import { Request, Response } from "express";
import { Menu } from "../models/Menu";
import { Varian_Menu } from "../models/VarianMenu";
import { Opsi_Menu } from "../models/OpsiMenu";
import { Op, where } from "sequelize";
import { Order } from "../models/Order";
import { OrderMenu } from "../models/OrderMenu";
import { sequelize } from "../config/database";
import { OrderMenu_Opsi } from "../models/OrderMenuOpsi";

const formatDateKey = (date: Date): string => {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${dd}${mm}${yyyy}`;
};

const generateNoOrder = async (
  date: Date,
  transaction: any
): Promise<string> => {
  const dateKey = formatDateKey(date);

  // Cari no_order terakhir untuk tanggal ini
  // Pakai LIKE "DDMMYYYY-%" lalu ORDER DESC ambil 1
  const lastOrder = await Order.findOne({
    where: {
      no_order: { [Op.like]: `${dateKey}-%` },
    },
    order: [["no_order", "DESC"]],
    transaction,
    paranoid: false, // include yang soft-deleted juga, biar sequence tidak collision
  });

  let nextSeq = 1;
  if (lastOrder?.no_order) {
    // Ambil bagian setelah dash → "0010" → parseInt → 10
    const parts = lastOrder.no_order.split("-");
    const lastSeq = parseInt(parts[1] as string, 10);
    if (!isNaN(lastSeq)) {
      nextSeq = lastSeq + 1;
    }
  }

  // Format jadi 4 digit dengan leading zero
  const seqStr = String(nextSeq).padStart(4, "0");
  return `${dateKey}-${seqStr}`;
};

const findAvailableTable = async (transaction: any): Promise<number> => {
  const MAX_TABLE = 50;

  // Ambil semua no_meja yang lagi dipakai dengan status PENDING
  const activeOrders = await Order.findAll({
    attributes: ["no_meja"],
    where: {
      status: "PENDING",
      order_type: "DINE_IN",
      no_meja: { [Op.not]: null }, // hanya yang punya no_meja
    },
    transaction,
  });

  const occupiedTables = new Set(
    activeOrders
      .map((o) => o.no_meja)
      .filter((no): no is number => no !== null && no !== undefined)
  );

  // Cari nomor meja terkecil yang belum dipakai
  for (let i = 1; i <= MAX_TABLE; i++) {
    if (!occupiedTables.has(i)) {
      return i;
    }
  }

  return 0; // semua penuh
};

export class OrderController {
  static async getAll(req: Request, res: Response) {
    try {
      const orders = await Order.findAll({
        include: [
          { model: OrderMenu,
            as: "orderMenuRelation",
            include: [
              { model: Menu },
              { model: Varian_Menu },
              {
                model: OrderMenu_Opsi,
                as: "opsi_list",
                include: [{ model: Opsi_Menu, as: "opsiMenu" }],
              },
            ]
          },
        ],
      });

      res.json({
        message: "Success",
        records: orders,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch orders",
        error,
      });
    }
  }

  // bikin order buat customer
  // create order, cekout dari cart
  // 1. bikin data ordernya
  // 2. mapping dari cart ke table order_menu
  // 3. kalo berhasil, commit. kalo error, rollback (transaction)
  // kenapa pake trancaction? krn bikin 1 order kudu pake 2 table (Orders sama Order_Menu)
  static async createOrder(req: Request, res: Response) {
    const transaction = await sequelize.transaction();

    try {
      const { order_type, items, total_harga } = req.body;

      // ---------- Validasi awal ----------
      if (!order_type || !["DINE_IN", "TAKEAWAY"].includes(order_type)) {
        await transaction.rollback();
        return res.status(400).json({
          message: "order_type harus DINE_IN atau TAKEAWAY",
        });
      }

      if (!items || !Array.isArray(items) || items.length === 0) {
        await transaction.rollback();
        return res.status(400).json({
          message: "items tidak boleh kosong",
        });
      }

      // ---------- 1. ASSIGN NO MEJA (kalau DINE_IN) ----------
      let assignedTable: number | null = null;

      if (order_type === "DINE_IN") {
        const availableTable = await findAvailableTable(transaction);

        if (availableTable === 0) {
          await transaction.rollback();
          return res.status(400).json({
            message:
              "Maaf, semua meja sedang terisi (status PENDING). Silakan coba lagi nanti.",
          });
        }

        assignedTable = availableTable;
      }

      // ---------- 2. GENERATE NO ORDER ----------
      const waktuPemesanan = new Date();
      const noOrder = await generateNoOrder(waktuPemesanan, transaction);

      // ---------- 3. CREATE ORDER ----------
      const newOrder = await Order.create(
        {
          no_order: noOrder,
          waktu_pemesanan: waktuPemesanan,
          total_harga,
          order_type,
          no_meja: assignedTable, // null untuk TAKEAWAY
          status: "PENDING",
        },
        { transaction }
      );

      // ---------- 4. CREATE ORDER MENU + JUNCTION OPSI ----------
      for (const item of items) {
        const orderMenu = await OrderMenu.create(
          {
            order_id: newOrder.id,
            menu_id: item.menu_id,
            mv_id: item.mv_id || null,
            quantity: item.quantity,
            harga_awal: item.harga_awal,
          },
          { transaction }
        );

        const opsiIds = item.opsi_ids ?? [];
        if (opsiIds.length > 0) {
          const opsiRows = opsiIds.map((o: any) => ({
            order_menu_id: orderMenu.id,
            mo_id: o.mo_id,
            harga_tambahan: o.harga_tambahan ?? 0,
          }));
          await OrderMenu_Opsi.bulkCreate(opsiRows, { transaction });
        }
      }

      await transaction.commit();

      return res.status(201).json({
        message: "Order created",
        data: {
          id: newOrder.id,
          no_order: newOrder.no_order,
          no_meja: newOrder.no_meja,
          order_type: newOrder.order_type,
          status: newOrder.status,
          total_harga: newOrder.total_harga,
          waktu_pemesanan: newOrder.waktu_pemesanan,
        },
      });
    } catch (err: any) {
      await transaction.rollback();
      console.error("ERROR CREATE ORDER:", err);
      return res.status(500).json({
        message: err.message ?? "Failed to create order",
      });
    }
  }

  // get by id
  static async getOrderById(req: Request, res: Response) {
      try {
          const { id } = req.params

          if (!id) {
              return res.status(400).json({
                  message: "ID Order harus diisi"
              })
          }

          const order = await Order.findByPk(id as string, {
              include: [
                  { 
                      model: OrderMenu, 
                      as: "orderMenuRelation",
                      include: [
                        { model: Menu, as: "menu" },
                        { model: Varian_Menu, as: "varian_menu" },
                        {
                          model: OrderMenu_Opsi,
                          as: "opsi_list",
                          include: [{ model: Opsi_Menu, as: "opsiMenu" }],
                        },]
                  }
              ]
          })

          if (!order) {
              return res.status(404).json({
                  message: "Order tidak ditemukan"
              })
          }

          return res.status(200).json({
              data: order
          })
      } catch (err: any) {
          return res.status(500).json({
              message: err.message
          })
      }
  }

  // update order status 
  static async updateOrderStatus(req: Request, res: Response) {
      try {
          const { id } = req.params
          const { status } = req.body 

          if (!id) {
              return res.status(400).json({
                  message: "ID Order harus diisi"
              })
          }

          const order = await Order.findByPk(id as string) // klo gapake as string error aih kneapa ya

          if (!order) {
              return res.status(404).json({
                  message: "Order tidak ditemukan"
              })
          }

          order.status = status
          await order.save()

          return res.status(200).json({
              message: `Status order berhasil diupdate ke ${status}`,
              data: order
          })
      } catch (err: any) {
          return res.status(500).json({
              message: err.message
          })
      }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const { order_type, no_meja, status } = req.body;

      const existingOrder = await Order.findByPk(id as string);

      if (!existingOrder) {
        return res.status(404).json({
          message: "Order not found",
        });
      }

      if (!order_type) {
        return res.status(400).json({
          message: "Order type is required",
        });
      }

      if (!status) {
        return res.status(400).json({
          message: "Order status is required",
        });
      }

      const order = await Order.update({
        order_type,
        no_meja,
        status
      },{
        where: {
          id,
        },
      },
    );

      res.json({
        message: "Success",
        data: order,
      });
    } catch (error) {
      console.error("ERROR EDIT ORDER:", error);
      res.status(500).json({
        message: "Failed to edit order",
        error,
      });
    }
  }
}
