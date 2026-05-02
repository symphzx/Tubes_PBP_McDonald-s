import { Request, Response, NextFunction } from "express";
import { Order } from "../models/Order";

export async function orderExist(
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

  const order = await Order.findByPk(id as string);

  if (!order) {
    res.status(404).json({ message: "order with ID " + id + " was not found" });
    return;
  }
  next();
}
