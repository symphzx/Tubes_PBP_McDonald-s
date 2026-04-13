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
  static async create(req: Request, res: Response) {
    try{
      const { nama, harga_awal, kategori, tipe, ketersediaan, tag, gambar } = req.body;

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

      if(!kategori){
        return res.status(400).json({
          message: "Menu category is required",
        });
      }

      if(!tipe){
        return res.status(400).json({
          message: "Menu type is required",
        });
      }

      if(!gambar){
        return res.status(400).json({
          message: "Menu image is required",
        });
      }

      if(!ketersediaan){
        return res.status(400).json({
          message: "Menu availability is required",
        });
      }

      const menu = await Menu.create({
        nama,
        harga_awal,
        kategori,
        tipe,
        gambar,
        ketersediaan
      });
      res.json({
        message: "Success",
        data: menu,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to create menu",
        error,
      });
    }
  }
}
