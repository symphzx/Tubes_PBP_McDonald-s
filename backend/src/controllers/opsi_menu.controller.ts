import { Request, Response } from "express";
import { Opsi_Menu } from "../models/OpsiMenu";

export class OpsiMenuController {
  static async create(req: Request, res: Response) {
    try {
      const { menu_id, nama, harga_tambahan } = req.body;

      if (!menu_id) {
        return res.status(400).json({
          message: "Menu ID is required",
        });
      }

      if (!nama) {
        return res.status(400).json({
          message: "Opsi Menu name is required",
        });
      }

      const opsiMenu = await Opsi_Menu.create({
        menu_id,
        nama,
        harga_tambahan,
      });
      res.json({
        message: "Success",
        data: opsiMenu,
      });
    } catch (error) {
      console.error("ERROR CREATE OPSI MENU:", error);
      res.status(500).json({
        message: "Failed to create opsi menu",
        error,
      });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const { menu_id, nama, harga_tambahan } = req.body;

      const existingOpsi = await Opsi_Menu.findByPk(id as string);

      if (!existingOpsi) {
        return res.status(404).json({
          message: "Opsi menu not found",
        });
      }

      if (!menu_id) {
        return res.status(400).json({
          message: "Menu ID is required",
        });
      }

      if (!nama) {
        return res.status(400).json({
          message: "Opsi Menu name is required",
        });
      }

      const opsiMenu = await Opsi_Menu.update(
        {
          menu_id,
          nama,
          harga_tambahan,
        },
        {
          where: {
            id,
          },
        },
      );
      res.json({
        message: "Success",
        data: opsiMenu,
      });
    } catch (error) {
      console.error("ERROR UPDATE OPSI MENU:", error);
      res.status(500).json({
        message: "Failed to UPDATE opsi menu",
        error,
      });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const opsiMenu = await Opsi_Menu.destroy({
        where: {
          id,
        },
      });
      res.json({
        message: "Success",
        data: opsiMenu,
      });
    } catch (error) {
      console.error("ERROR DELETE OPSI MENU:", error);
      res.status(500).json({
        message: "Failed to DELETE opsi menu",
        error,
      });
    }
  }
}
