// src/server.ts
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import reportRoutes from "./routes/reportRoutes"; // <-- BARU: Import route laporan

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // alamat frontend
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" })); // <-- TINGKATKAN BATAS JSON
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes); // <-- BARU: Gunakan route laporan

// Start server
const PORT = 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
