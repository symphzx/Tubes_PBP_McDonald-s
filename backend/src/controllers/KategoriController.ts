import { Request, Response } from "express";
import { Kategori } from "../models/Kategori";
import { Menu } from "../models/Menu";


export class KategoriController {
  // get all kategori
  static async getAll(req: Request, res: Response) {
    try {
      const kategori = await Kategori.findAll();

      res.json({
        message: "Success",
        records: kategori,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch kategori",
        error,
      });
    }
  }

  // get kat by id
  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const kategori = await Kategori.findByPk(id as string, {
        include: [
          {
            model: Menu,
            as: "menuRelation",
            where: { ketersediaan: "Tersedia" }
          }
        ]
      })

      if (!kategori) {
        return res.status(404).json({
          message: "Kategori tidak ditemukan"
        })
      }

      return res.status(200).json({
        data: kategori
      })
    } catch (error: any) {
      return res.status(500).json({
        message: error.message
      })
    }
  }
}