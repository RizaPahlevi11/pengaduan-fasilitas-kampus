import { Urgency } from "./types";

export const REPORT_CATEGORIES: string[] = [
  "Kebersihan",
  "Kerusakan AC",
  "Fasilitas Belajar",
  "Penerangan",
  "Kerusakan Toilet",
  "Keamanan",
  "Lainnya",
];

export const REPORT_URGENCIES: Urgency[] = [
  Urgency.Rendah,
  Urgency.Sedang,
  Urgency.Tinggi,
];