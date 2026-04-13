import { Request, Response } from "express";
import { Menu } from "../models/Menu";
import { Varian_Menu } from "../models/VarianMenu";
import { Opsi_Menu } from "../models/OpsiMenu";
import { Paket_Menu } from "../models/PaketMenu";

export class MenuController {
  static async getAll(req: Request, res: Response) {
    try {
      const menu = await Menu.findAll({
        include: [
          { model: Varian_Menu },
          { model: Opsi_Menu },
          { model: Paket_Menu, as: "menuRelation" },
          { model: Paket_Menu, as: "paketRelation" },
        ],
        where: {
          ketersediaan: "Tersedia",
        }
      });

      res.json({
        message: "Success",
        records: menu,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch menu",
        error,
      });
    }
  }
  // static async create(req: Request, res: Response) {
  //   const { title, author } = req.body;
  //   const book = await Book.create({
  //     title,
  //     author,
  //   });
  //   res.json(book);
  // }
}
