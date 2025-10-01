// controllers/authController.ts
import { Request, Response } from "express";
import db from "../db"; // koneksi MySQL

export const registerUser = async (req: Request, res: Response) => {
  const { name, userIdentifier, password, role } = req.body; 
  try {
    const [rows]: any = await db.query("SELECT * FROM users WHERE user_identifier = ?", [userIdentifier]);
    if (rows.length > 0) {
      return res.status(400).json({ success: false, message: "User sudah terdaftar" });
    }
    await db.query(
      "INSERT INTO users (name, user_identifier, password_hash, role) VALUES (?, ?, ?, ?)",
      [name, userIdentifier, password, role] 
    );
    res.status(201).json({ success: true, message: "Pendaftaran berhasil" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
export const loginUser = async (req: Request, res: Response) => {
  const { userIdentifier, password } = req.body;
  try {
    const [rows]: any = await db.query("SELECT * FROM users WHERE user_identifier = ? AND password_hash = ?", [userIdentifier, password]);
    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: "Email/Password salah" });
    }
    const user = rows[0];
    res.json({
      success: true,
      user: { name: user.name, userIdentifier: user.user_identifier, role: user.role },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
