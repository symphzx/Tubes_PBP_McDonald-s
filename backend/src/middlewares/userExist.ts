import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";

export async function userExist(
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

  const user = await User.findByPk(id as string);

  if (!user) {
    res.status(404).json({ message: "user with ID " + id + " was not found" });
    return;
  }
  next();
}
