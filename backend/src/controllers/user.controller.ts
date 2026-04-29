import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt";

export class UserController {
  static async getAll(req: Request, res: Response) {
    try {
      const user = await User.findAll();

      res.json({
        message: "Success",
        records: user,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch user",
        error,
      });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id as string);

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      res.json({
        message: "Success",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch user",
        error,
      });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const pe = process.env;
      const { nama, email, password, role } = req.body;

      if (!nama) {
        return res.status(400).json({
          message: "Nama is required",
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

      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        return res.status(400).json({
          message: "Email already registered",
        });
      }

      const hashed = bcrypt.hashSync(
        pe.BCRYPT_PEPPER + password,
        parseInt(pe.BCRYPT_SALT_ROUNDS as string),
      );

      const user = await User.create({
        nama,
        email,
        password: hashed,
        role,
      });

      res.json({
        message: "Success",
        data: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to create user",
        error,
      });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const pe = process.env;
      const { id } = req.params;
      const { nama, email, password, role } = req.body;

      const user = await User.findByPk(id as string);

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      if (!nama) {
        return res.status(400).json({
          message: "Nama is required",
        });
      }

      if (!email) {
        return res.status(400).json({
          message: "Email is required",
        });
      }

      if (!role) {
        return res.status(400).json({
          message: "Role is required",
        });
      }

      const hashed = bcrypt.hashSync(
        pe.BCRYPT_PEPPER + password,
        parseInt(pe.BCRYPT_SALT_ROUNDS as string),
      );
      
      const updatedUser = await User.update({
        nama,
        email,
        password: hashed,
        role,
      },{
        where: {
          id
        }
      });

      res.json({
        message: "Success",
        data: updatedUser,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to update user",
        error,
      });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id as string);

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      await user.destroy();

      res.json({
        message: "Success",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to delete user",
        error,
      });
    }
  }
}
