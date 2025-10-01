import { Request, Response } from "express";
import db from "../db";

export const submitReport = async (req: Request, res: Response) => {
  const { name, userIdentifier, location, specificLocation, category, description, urgency, photos } = req.body;
  try {
    const [userRows]: any = await db.query("SELECT id FROM users WHERE user_identifier = ?", [userIdentifier]);
    if (userRows.length === 0) {
      return res.status(404).json({ success: false, message: "Pelapor tidak ditemukan." });
    }
    const userId = userRows[0].id;
    const [result]: any = await db.query(
      `INSERT INTO reports 
        (user_id, name, user_identifier, location, specific_location, category, description, urgency, photos, status) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending')`,
      [userId, name, userIdentifier, location, specificLocation, category, description, urgency, JSON.stringify(photos)]
    );
    const [newReport]: any = await db.query("SELECT * FROM reports WHERE id = ?", [result.insertId]);
    const reportData = {
      ...newReport[0],
      photos: newReport[0].photos ? JSON.parse(newReport[0].photos) : [],
    };
    res.status(201).json({
      success: true,
      message: "Laporan berhasil dikirim.",
      report: reportData, 
    });
  } catch (error) {
    console.error("Kesalahan saat menyimpan laporan:", error);
    res.status(500).json({ success: false, message: "Terjadi kesalahan server saat menyimpan laporan." });
  }
};

export const getReports = async (req: Request, res: Response) => {
  try {
    const { userIdentifier } = req.query;
    console.log("getReports called");
    console.log("userIdentifier:", userIdentifier);
    let query = "SELECT * FROM reports";
    let params: any[] = [];
    if (userIdentifier) {
      query += " WHERE user_identifier = ?";
      params.push(userIdentifier);
    }
    query += " ORDER BY submitted_at DESC";
    console.log("Executing query:", query);
    console.log("With params:", params);
    const [reports]: any = await db.query(query, params);
    console.log("Raw reports from DB:", reports);
    console.log("Total reports found:", reports.length);
    const processedReports = reports.map((report: any) => {
      console.log("Processing report:", report.id);
      return {
        id: String(report.id), 
        name: report.name,
        userIdentifier: report.user_identifier,
        location: report.location,
        specificLocation: report.specific_location,
        category: report.category,
        description: report.description,
        status: report.status,
        submittedAt: report.submitted_at,
        urgency: report.urgency,
        photos: report.photos ? JSON.parse(report.photos) : [],
      };
    });
    console.log("Processed reports:", processedReports);
    res.status(200).json({ success: true, reports: processedReports });
  } catch (error) {
    console.error("Error saat mengambil laporan:", error);
    res.status(500).json({ success: false, message: "Gagal memuat laporan." });
  }
};
