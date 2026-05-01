import { Request, Response } from "express";
import { Varian_Menu } from "../models/VarianMenu";

export class VarianMenuController {
  static async create(req: Request, res: Response) {
    try {
      const { menu_id, nama, harga_tambahan } =
        req.body;

      if (!menu_id) {
        return res.status(400).json({
          message: "Menu ID is required",
        });
      }

      if (!nama) {
        return res.status(400).json({
          message: "Varian Menu name is required",
        });
      }

      const varianMenu = await Varian_Menu.create({
        menu_id,
        nama,
        harga_tambahan,
      });
      res.json({
        message: "Success",
        data: varianMenu,
      });
    } catch (error) {
      console.error("ERROR CREATE VARIAN MENU:", error);
      res.status(500).json({
        message: "Failed to create varian menu",
        error,
      });
    }
  }
  
  static async update(req: Request, res: Response) {
      try {
        const { id } = req.params;
  
        const { menu_id, nama, harga_tambahan } = req.body;
  
        const existingVarian = await Varian_Menu.findByPk(id as string);
  
        if (!existingVarian) {
          return res.status(404).json({
            message: "Varian menu not found",
          });
        }
  
        if (!menu_id) {
          return res.status(400).json({
            message: "Menu ID is required",
          });
        }
  
        if (!nama) {
          return res.status(400).json({
            message: "Varian Menu name is required",
          });
        }
  
        const varianMenu = await Varian_Menu.update(
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
          data: varianMenu,
        });
      } catch (error) {
        console.error("ERROR UPDATE VARIAN MENU:", error);
        res.status(500).json({
          message: "Failed to UPDATE varian menu",
          error,
        });
      }
    }
  
    static async delete(req: Request, res: Response) {
      try {
        const { id } = req.params;
  
        const varianMenu = await Varian_Menu.destroy({
          where: {
            id,
          },
        });
        res.json({
          message: "Success",
          data: varianMenu,
        });
      } catch (error) {
        console.error("ERROR DELETE VARIAN MENU:", error);
        res.status(500).json({
          message: "Failed to DELETE varian menu",
          error,
        });
      }
    }
}
