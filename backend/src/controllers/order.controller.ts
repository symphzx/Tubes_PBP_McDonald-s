import { Request, Response } from "express";
import { Menu } from "../models/Menu";
import { Varian_Menu } from "../models/VarianMenu";
import { Opsi_Menu } from "../models/OpsiMenu";
import { where } from "sequelize";
import { Order } from "../models/Order";
import { OrderMenu } from "../models/OrderMenu";

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
