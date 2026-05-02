import { Request, Response, NextFunction } from "express";

export function validateCreateUser(req: Request, res: Response, next: NextFunction) {
  const { nama, email, password } = req.body;

  if (!nama) {
    return res.status(400).json({
      message: "Nama is required",
    });
  }

  if (typeof nama !== "string" || /\d/.test(nama)) {
    return res.status(400).json({
      message: "Nama must be a string",
    });
  }

  if (!email) {
    return res.status(400).json({
      message: "Email is required",
    });
  }

  if (!password) {
    return res.status(400).json({
      message: "Password is required",
    });
  }

  next();
}

export function validateUpdateUser(req: Request, res: Response, next: NextFunction) {
  const { nama, email } = req.body;

  if (!nama) {
    return res.status(400).json({
      message: "Nama is required",
    });
  }

  if (typeof nama !== "string" || /\d/.test(nama)) {
    return res.status(400).json({
      message: "Nama must be a string",
    });
  }

  if (!email) {
    return res.status(400).json({
      message: "Email is required",
    });
  }

  next();
}
