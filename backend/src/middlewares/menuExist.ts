import { Request, Response, NextFunction } from "express";
import { Menu } from "../models/Menu";

export async function menuExist(
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

  const menu = await Menu.findByPk(id as string);

  if (!menu) {
    res.status(404).json({ message: "Menu with ID " + id + " was not found" });
    return;
  }
  next();
}
