import { Request, Response } from "express";
import { Menu } from "../models/Menu";
import { Varian_Menu } from "../models/VarianMenu";
import { Opsi_Menu } from "../models/OpsiMenu";
import { Paket_Menu } from "../models/PaketMenu";
import { where } from "sequelize";
import { Kategori } from "../models/Kategori";

export class MenuController {
  static async getAll(req: Request, res: Response) {
    try {
      const menu = await Menu.findAll({
        include: [
          { model: Varian_Menu },
          { model: Opsi_Menu },
          { model: Paket_Menu, as: "menuRelation" },
          { model: Paket_Menu, as: "paketRelation" },
          { model: Kategori, as: "kategoriRelation" },
          { model: Menu, as: "recommendation" },
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
    try {
      const { kategori_id, nama, harga_awal, tipe, ketersediaan, tag } =
        req.body;

      const file = (req as any).file;

      const imageUrl = file
        ? `http://localhost:3000/uploads/assets/${file.filename}`
        : null;

      if (!kategori_id) {
        return res.status(400).json({
          message: "Menu category is required",
        });
      }

      if (!nama) {
        return res.status(400).json({
          message: "Menu name is required",
        });
      }

      if (!harga_awal) {
        return res.status(400).json({
          message: "Menu price is required",
        });
      }

      if (!tipe) {
        return res.status(400).json({
          message: "Menu type is required",
        });
      }

      if (!ketersediaan) {
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
        tag: tag ? tag : null,
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
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const { kategori_id, nama, harga_awal, tipe, ketersediaan, tag } = req.body;

      const existingMenu = await Menu.findByPk(id as string);

      if (!existingMenu) {
        return res.status(404).json({
          message: "Menu not found",
        });
      }


      const file = (req as any).file;
      const { existingImage } = req.body;

      let imageUrl = existingMenu.gambar;

      if (file) {
        imageUrl = `http://localhost:3000/uploads/assets/${file.filename}`;
      } else if (existingImage) {
        imageUrl = existingImage;
      }

      if (!kategori_id) {
        return res.status(400).json({
          message: "Menu category is required",
        });
      }

      if (!nama) {
        return res.status(400).json({
          message: "Menu name is required",
        });
      }

      if (!harga_awal) {
        return res.status(400).json({
          message: "Menu price is required",
        });
      }

      if (!tipe) {
        return res.status(400).json({
          message: "Menu type is required",
        });
      }

      if (!ketersediaan) {
        return res.status(400).json({
          message: "Menu availability is required",
        });
      }

      const menu = await Menu.update({
        kategori_id,
        nama,
        harga_awal,
        tipe,
        gambar: imageUrl,
        ketersediaan,
        tag: tag ? tag : null,
      },{
        where: {
          id,
        },
      },
    );

      res.json({
        message: "Success",
        data: menu,
      });
    } catch (error) {
      console.error("ERROR EDIT MENU:", error);
      res.status(500).json({
        message: "Failed to edit menu",
        error,
      });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const menuVariant = await Varian_Menu.findAll({
        where: {
          menu_id: id,
        },
      });

      const menuOption = await Opsi_Menu.findAll({
        where: {
          menu_id: id,
        },
      });

      const menuPaket = await Paket_Menu.findAll({
        where: {
          menu_id: id,
        },
      });

      if (!menuVariant && !menuOption && !menuPaket) {
        return res.status(404).json({
          message: "Menu not found",
        });
      }

      menuVariant.forEach((element) => {
        element.destroy();
      })

      menuOption.forEach((element) => {
        element.destroy();
      })

      menuPaket.forEach((element) => {
        element.destroy();
      })

      const menu = await Menu.destroy({
        where: {
          id,
        },
      });
      
      res.json({
        message: "Success",
        data: menu,
      });
    } catch (error) {
      console.error("ERROR DELETE MENU:", error);
      res.status(500).json({
        message: "Failed to delete menu",
        error,
      });
    }
  }
}
