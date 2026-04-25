import { Request, Response } from "express";
import { Menu } from "../models/Menu";
import { Varian_Menu } from "../models/VarianMenu";
import { Opsi_Menu } from "../models/OpsiMenu";
import { Op, where } from "sequelize";
import { Order } from "../models/Order";
import { OrderMenu } from "../models/OrderMenu";
import { sequelize } from "../config/database";

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
              { model: Opsi_Menu },
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
  static async createOrder(req: Request, res:Response) {
      const transaction = await sequelize.transaction()

      try {
          const { order_type, no_meja, items, total_harga } = req.body
          
          // buat generate no_meja sama order_no
          const lastOrder = await Order.findOne({
              order: [['createdAt', 'DESC']],
              transaction
          })

          // konsepnya dapet order_no brdsrkn order_no terakhir
          // klo blm ada last order, otomatis 1
          // let nextOrder_no = 1
          // if (lastOrder && lastOrder.order_no) {
          //     nextOrder_no = lastOrder.order_no + 1 
          // }

          // konsepnya ngambil semua no_meja yg lagi dipake && status ga completed
          // trus cari no_meja dari 1-50 yg gaada di list occupied
          let assignedTable = 0
          if (order_type === "DINE_IN") {
              const activeOrders = await Order.findAll({
                  attributes: ['no_meja'],
                  where: {
                      status: { [Op.not]: "COMPLETED"},
                      order_type: "DINE_IN"
                  },
                  transaction
              })

              const occupiedTables = activeOrders.map(o => o.no_meja) // ngambil no_meja nya aja dari activeOrders

              for (let i = 1; i <= 50; i++) {
                  if (!occupiedTables.includes(i)) {
                      assignedTable = i
                      break
                  }
              }

              if (assignedTable === 0) {
                  await transaction.rollback()
                  return res.status(400).json({
                      message: "Semua meja penuh"
                  })
              }
          }
          
          // bikin order
          const newOrder = await Order.create({
              waktu_pesanan: new Date().toISOString(),
              total_harga,
              order_type,
              no_meja: order_type === "TAKEAWAY" ? 0 : assignedTable,
              status: "PENDING",
              // order_no: nextOrder_no
          },
          {
              transaction
          })

          // bikin detail menu
          const orderItems = items.map((item: any) => ({
              order_id: newOrder.id,
              menu_id: item.menu_id,
              mv_id: item.mv_id || null,
              mo_id: item.mo_id || null,
              quantity: item.quantity,
              harga_awal: item.harga_awal
          }))

          // pake bulkCreate krn mau add banyak data sekaligus
          await OrderMenu.bulkCreate(orderItems, { transaction })

          await transaction.commit()

          return res.status(201).json({
              message: "Order created",
              // order_no: newOrder.order_no,
              data: newOrder
          })
      } catch (err: any) {
          await transaction.rollback()
          return res.status(500).json({
              message: err.message
          })
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
                      include: ["menu", "varian_menu", "opsi_menu"]
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


  // static async create(req: Request, res: Response) {
  //   try {
  //     const { kategori_id, nama, harga_awal, tipe, ketersediaan, tag } =
  //       req.body;

  //     const file = (req as any).file;

  //     const imageUrl = file
  //       ? `http://localhost:3000/uploads/assets/${file.filename}`
  //       : null;

  //     if (!kategori_id) {
  //       return res.status(400).json({
  //         message: "Menu category is required",
  //       });
  //     }

  //     if (!nama) {
  //       return res.status(400).json({
  //         message: "Menu name is required",
  //       });
  //     }

  //     if (!harga_awal) {
  //       return res.status(400).json({
  //         message: "Menu price is required",
  //       });
  //     }

  //     if (!tipe) {
  //       return res.status(400).json({
  //         message: "Menu type is required",
  //       });
  //     }

  //     if (!ketersediaan) {
  //       return res.status(400).json({
  //         message: "Menu availability is required",
  //       });
  //     }

  //     const menu = await Menu.create({
  //       kategori_id,
  //       nama,
  //       harga_awal,
  //       tipe,
  //       gambar: imageUrl,
  //       ketersediaan,
  //       tag: tag ? tag : null,
  //     });
  //     res.json({
  //       message: "Success",
  //       data: menu,
  //     });
  //   } catch (error) {
  //     console.error("ERROR CREATE MENU:", error);
  //     res.status(500).json({
  //       message: "Failed to create menu",
  //       error,
  //     });
  //   }
  // }
  // static async update(req: Request, res: Response) {
  //   try {
  //     const { id } = req.params;

  //     const { kategori_id, nama, harga_awal, tipe, ketersediaan, tag } = req.body;

  //     const existingMenu = await Menu.findByPk(id as string);

  //     if (!existingMenu) {
  //       return res.status(404).json({
  //         message: "Menu not found",
  //       });
  //     }


  //     const file = (req as any).file;
  //     const { existingImage } = req.body;

  //     let imageUrl = existingMenu.gambar;

  //     if (file) {
  //       imageUrl = `http://localhost:3000/uploads/assets/${file.filename}`;
  //     } else if (existingImage) {
  //       imageUrl = existingImage;
  //     }

  //     if (!kategori_id) {
  //       return res.status(400).json({
  //         message: "Menu category is required",
  //       });
  //     }

  //     if (!nama) {
  //       return res.status(400).json({
  //         message: "Menu name is required",
  //       });
  //     }

  //     if (!harga_awal) {
  //       return res.status(400).json({
  //         message: "Menu price is required",
  //       });
  //     }

  //     if (!tipe) {
  //       return res.status(400).json({
  //         message: "Menu type is required",
  //       });
  //     }

  //     if (!ketersediaan) {
  //       return res.status(400).json({
  //         message: "Menu availability is required",
  //       });
  //     }

  //     const menu = await Menu.update({
  //       kategori_id,
  //       nama,
  //       harga_awal,
  //       tipe,
  //       gambar: imageUrl,
  //       ketersediaan,
  //       tag: tag ? tag : null,
  //     },{
  //       where: {
  //         id,
  //       },
  //     },
  //   );

  //     res.json({
  //       message: "Success",
  //       data: menu,
  //     });
  //   } catch (error) {
  //     console.error("ERROR EDIT MENU:", error);
  //     res.status(500).json({
  //       message: "Failed to edit menu",
  //       error,
  //     });
  //   }
  // }

  // static async delete(req: Request, res: Response) {
  //   try {
  //     const { id } = req.params;

  //     const menuVariant = await Varian_Menu.findAll({
  //       where: {
  //         menu_id: id,
  //       },
  //     });

  //     const menuOption = await Opsi_Menu.findAll({
  //       where: {
  //         menu_id: id,
  //       },
  //     });

  //     const menuPaket = await Paket_Menu.findAll({
  //       where: {
  //         menu_id: id,
  //       },
  //     });

  //     if (!menuVariant && !menuOption && !menuPaket) {
  //       return res.status(404).json({
  //         message: "Menu not found",
  //       });
  //     }

  //     menuVariant.forEach((element) => {
  //       element.destroy();
  //     })

  //     menuOption.forEach((element) => {
  //       element.destroy();
  //     })

  //     menuPaket.forEach((element) => {
  //       element.destroy();
  //     })

  //     const menu = await Menu.destroy({
  //       where: {
  //         id,
  //       },
  //     });
      
  //     res.json({
  //       message: "Success",
  //       data: menu,
  //     });
  //   } catch (error) {
  //     console.error("ERROR DELETE MENU:", error);
  //     res.status(500).json({
  //       message: "Failed to delete menu",
  //       error,
  //     });
  //   }
  // }
}
