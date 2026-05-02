import { Request, Response, NextFunction } from "express";

export function validateMenu(req: Request, res: Response, next: NextFunction) {
  const { kategori_id, nama, harga_awal, tipe, ketersediaan } = req.body;

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

  if (isNaN(harga_awal)) {
    return res.status(400).json({
      message: "Menu price must be a number",
    });
  }

  if (harga_awal < 0) {
    return res.status(400).json({
      message: "Menu price must be greater than 0",
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

  next();
}
