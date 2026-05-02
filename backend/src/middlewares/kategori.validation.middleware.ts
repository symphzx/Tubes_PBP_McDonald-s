import { Request, Response, NextFunction } from "express";

export function validateKategori(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { nama, sortOrder } = req.body;

  if (!nama) {
    return res.status(400).json({
      message: "Kategori nama is required",
    });
  }

  if (typeof nama !== "string" || /\d/.test(nama)) {
    return res.status(400).json({
      message: "Kategori nama must be a string",
    });
  }

  if (!sortOrder) {
    return res.status(400).json({
      message: "Kategori sort order is required",
    });
  }

  if (sortOrder < 1) {
    return res.status(400).json({
      message: "Kategori sort order must be greater than 1",
    });
  }

  if (typeof sortOrder !== "number") {
    return res.status(400).json({
      message: "Kategori sort order must be a number",
    });
  }

  next();
}
