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
  static async create(req: Request, res: Response) {
    try{
      const { kategori_id, nama, harga_awal, tipe, ketersediaan, tag } = req.body;

      const file = (req as any).file;

      const imageUrl = file
      ? `http://localhost:3000/uploads/assets/${file.filename}`
      : null;

      if(!kategori_id){
        return res.status(400).json({
          message: "Menu category is required",
        });
      }

      if(!nama){
        return res.status(400).json({
          message: "Menu name is required",
        });
      }

      if(!harga_awal){
        return res.status(400).json({
          message: "Menu price is required",
        });
      }

      if(!tipe){
        return res.status(400).json({
          message: "Menu type is required",
        });
      }

      if(!ketersediaan){
        return res.status(400).json({
          message: "Menu availability is required",
        });
      }

      const menu = await Menu.create({
        kategori_id,
        nama,
        harga_awal,
        tipe,
        gambar: imageUrl,
        ketersediaan,
        tag: tag ? tag : null
      });
      res.json({
        message: "Success",
        data: menu,
      });
    } catch (error) {
      console.error("ERROR CREATE MENU:", error);
      res.status(500).json({
        message: "Failed to create menu",
        error,
      });
    }
  }
}
