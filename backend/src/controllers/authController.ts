// controllers/authController.ts
import { Request, Response } from "express";
import db from "../db"; // koneksi MySQL

export const registerUser = async (req: Request, res: Response) => {
  // ... (Validasi req.body yang sudah ada)

  const { name, userIdentifier, password, role } = req.body; // <--- Variabel frontend tetap ini

  // ... (Validasi field penting)

  try {
    // PERBAIKAN 1: Gunakan 'user_identifier'
    const [rows]: any = await db.query("SELECT * FROM users WHERE user_identifier = ?", [userIdentifier]);

    if (rows.length > 0) {
      return res.status(400).json({ success: false, message: "User sudah terdaftar" });
    }

    // PERBAIKAN 2: Gunakan 'user_identifier' dan 'password_hash'
    // Peringatan: Anda menyimpan password mentah (tidak di-hash), ini harus diubah!
    await db.query(
      "INSERT INTO users (name, user_identifier, password_hash, role) VALUES (?, ?, ?, ?)",
      [name, userIdentifier, password, role] // Data yang di-insert tetap sama
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
    // ⚠️ PERBAIKAN 1: Menggunakan nama kolom yang benar: user_identifier & password_hash
    const [rows]: any = await db.query("SELECT * FROM users WHERE user_identifier = ? AND password_hash = ?", [userIdentifier, password]);

    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: "Email/Password salah" });
    }

    const user = rows[0];
    res.json({
      success: true,
      // PERBAIKAN 2: Menggunakan nama kolom DB yang benar saat merespons
      user: { name: user.name, userIdentifier: user.user_identifier, role: user.role },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
