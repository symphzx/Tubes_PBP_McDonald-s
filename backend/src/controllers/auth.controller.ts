import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

export class AuthController {
  static async me(req: Request, res: Response) {
    const userLogin = (req as any).user;

    const user = await User.findByPk(userLogin.id,{
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt']
      }
    });
    res.json({
      message: "Success",
      data: {
        user
      },
    });
  }

  static async register(req: Request, res: Response) {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
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
  }

  static async login(req: Request, res: Response) {
    const pepper = process.env.BCRYPT_PEPPER as string;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isValid = await bcrypt.compare(pepper + password, user.getDataValue("password"));

    if (!isValid) {
      return res.status(401).json({
        message: "Wrong password",
      });
    }

    const token = jwt.sign(
      { 
        id: user.id,
        nama: user.nama,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Success",
      data: {
        token,
      },
    });
  }
}
