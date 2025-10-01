import { Report } from "../types";
type ReportPayload = Omit<Report, "id" | "status" | "submittedAt">;
const API_BASE_URL = "http://localhost:5000/api";
export const submitReportService = async (reportData: ReportPayload) => {
  try {
    const response = await fetch(`${API_BASE_URL}/reports`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reportData),
    });
    const data = await response.json();
    if (!response.ok) {
      const errorMessage = data.message || `Gagal mengirim laporan. Status: ${response.status}`;
      throw new Error(errorMessage);
    }
    return { success: true, data };
  } catch (error) {
    console.error("Error saat submit laporan:", error);
    throw error;
  }
};
