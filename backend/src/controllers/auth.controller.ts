import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { createTransporter } from "../utils/mailer";

export class AuthController {
  static async me(req: Request, res: Response) {
    const userLogin = (req as any).user;

    const user = await User.findByPk(userLogin.id, {
      attributes: {
        exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
      },
    });
    res.json({
      message: "Success",
      data: {
        user,
      },
    });
  }

  // static async register(req: Request, res: Response) {
  //   const { email, password, role } = req.body;

  //   if (!email || !password) {
  //     return res.status(400).json({
  //       message: "Email and password are required",
  //     });
  //   }

  //   const existingUser = await User.findOne({ where: { email } });

  //   if (existingUser) {
  //     return res.status(400).json({
  //       message: "Email already registered",
  //     });
  //   }

  //   const hashed = await bcrypt.hash(password, 10);

  //   const user = await User.create({
  //     email,
  //     password: hashed,
  //     role,
  //   });

  //   res.json({
  //     message: "Success",
  //     data: {
  //       id: user.id,
  //       email: user.email,
  //       role: user.role,
  //     },
  //   });
  // }

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

    const isValid = await bcrypt.compare(
      pepper + password,
      user.getDataValue("password"),
    );

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
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" },
    );

    res.cookie("token", token, {
      httpOnly: true,     // Tidak bisa diakses via JavaScript
      secure: false,      // Set true di production (HTTPS)
      sameSite: "lax",    // Proteksi CSRF
      maxAge: 60 * 60 * 1000, // 1 jam (sama dengan JWT expiry)
      path: "/",
    });

    res.json({
      message: "Success",
      data: {
        token,
      },
    });
  }

  static async logout(req: Request, res: Response) {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    res.json({ message: "Logged out successfully" });
  }

  static async forgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;

      const user = await User.findOne({ where: { email } });

      console.log("email payload: " + email);
      console.log("user found: " + user);

      if (!user) {
        // Don't reveal whether email exists
        return res.json({
          message: "If that email exists, a reset link has been sent.",
        });
      }

      const token = crypto.randomBytes(32).toString("hex");
      const expiry = new Date(Date.now() + 1000 * 60 * 60); // 60 minutes

      user.forget_token = token;
      user.forget_token_expired = expiry;
      await user.save();

      const resetLink = `http://localhost:5173/reset-password?token=${token}`;

      const { transporter } = await createTransporter();

      const info = await transporter.sendMail({
        from: '"Support" <support@yourapp.com>',
        to: user.email,
        subject: "Password Reset Request",
        html: `
                    <p>Hi ${user.nama},</p>
                    <p>Click the link below to reset your password. This link expires in 60 minutes.</p>
                    <a href="${resetLink}">${resetLink}</a>
                    <p>If you didn't request this, ignore this email.</p>
                `,
      });

      console.log("Preview URL:", nodemailer.getTestMessageUrl(info));

      res.json({
        message: "If that email exists, a reset link has been sent.",
      });
    } catch (error) {
      res.status(500).json({ message: error });
      throw error;
    }
  }

  static async resetPassword(req: Request, res: Response) {
    try {
      const { token, newPassword } = req.body;

      const pe = process.env;

      const user = await User.findOne({ where: { forget_token: token } });

      if (
        !user ||
        !user.forget_token_expired ||
        user.forget_token_expired < new Date()
      ) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }

      // user.password = await bcrypt.hash(newPassword, 10);
      user.password = bcrypt.hashSync(pe.BCRYPT_PEPPER + newPassword, parseInt(pe.BCRYPT_SALT_ROUNDS as string));
      user.forget_token = null!;
      user.forget_token_expired = null!;
      await user.save();

      res.json({ message: "Password reset successfully" });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}
