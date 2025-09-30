// src/server.ts
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // alamat frontend
    credentials: true,
  })
);
app.use(express.json()); // supaya req.body bisa terbaca

// Routes
app.use("/api/auth", authRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
