import { Request, Response } from "express";
import { Kategori } from "../models/Kategori";


export class KategoriController {
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
}