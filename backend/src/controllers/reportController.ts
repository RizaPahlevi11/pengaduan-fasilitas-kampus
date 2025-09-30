// src/controllers/reportController.ts
import { Request, Response } from "express";
import pool from "../db";

export const createReport = async (req: Request, res: Response): Promise<void> => {
  const { userId, title, description } = req.body;

  try {
    const [result] = await pool.query("INSERT INTO reports (user_id, title, description) VALUES (?, ?, ?)", [userId, title, description]);
    res.json({ message: "Report created", result });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getReports = async (_req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await pool.query("SELECT * FROM reports ORDER BY created_at DESC");
    res.json(rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
