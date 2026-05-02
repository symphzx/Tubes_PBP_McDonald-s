import { Request, Response, NextFunction } from "express";
import { Kategori } from "../models/Kategori";

export async function kategoriExist(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "Id is required",
    });
  }

  const kategori = await Kategori.findByPk(id as string);

  if (!kategori) {
    res.status(404).json({ message: "kategori with ID " + id + " was not found" });
    return;
  }
  next();
}
