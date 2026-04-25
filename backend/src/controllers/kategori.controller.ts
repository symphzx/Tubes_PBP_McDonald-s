import { Request, Response } from "express";
import { Kategori } from "../models/Kategori";
import { Menu } from "../models/Menu";


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

  static async create(req: Request, res: Response) {
    try {
      const { nama, sortOrder, startDate, endDate, startTime, endTime } = req.body;

      const kategori = await Kategori.create({
        nama,
        sortOrder,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        startTime: startTime || null,
        endTime: startTime || null,
      });

      res.json({
        message: "Success",
        record: kategori,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to create kategori",
        error,
      });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const { nama, sortOrder, startDate, endDate, startTime, endTime } = req.body;

      const existingKategori = await Kategori.findByPk(id as string);

      if (!existingKategori) {
        return res.status(404).json({
          message: "Kategori not found",
        });
      }

      if(!nama) {
        return res.status(400).json({
          message: "Kategori name is required",
        });
      }

      if(!sortOrder) {
        return res.status(400).json({
          message: "Kategori sort order is required",
        });
      }

      if(!startDate) {
        return res.status(400).json({
          message: "Kategori start date is required",
        });
      }

      const kategori = await Kategori.update({
        nama,
        sortOrder,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        startTime: startTime || null,
        endTime: endTime || null,
      },{
        where: {
          id,
        },
      });

      res.json({
        message: "Success",
        record: kategori,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to update kategori",
        error,
      });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const kategori = await Kategori.findByPk(id as string);

      if (!kategori) {
        return res.status(404).json({
          message: "Kategori not found",
        });
      }

      await kategori.destroy();

      res.json({
        message: "Success",
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to delete kategori",
        error,
      });
    }
  }
}