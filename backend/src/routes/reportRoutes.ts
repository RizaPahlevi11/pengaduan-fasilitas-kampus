import express from "express";
import { submitReport, getReports } from "../controllers/reportController";
const router = express.Router();

router.post("/", submitReport);
router.get("/", getReports); 
export default router;
