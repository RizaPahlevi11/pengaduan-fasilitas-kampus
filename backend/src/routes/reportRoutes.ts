// src/routes/reportRoutes.ts
import { Router } from "express";
import { createReport, getReports } from "../controllers/reportController";

const router = Router();

// POST /api/report
router.post("/", createReport);

// GET /api/report
router.get("/", getReports);

export default router;
