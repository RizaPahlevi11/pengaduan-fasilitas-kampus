export enum Status {
  Pending = 'Pending',
  InProgress = 'In Progress',
  Resolved = 'Resolved',
}

export enum Urgency {
  Rendah = 'Rendah',
  Sedang = 'Sedang',
  Tinggi = 'Tinggi',
}

export interface Report {
  id: string;
  name: string;
  userIdentifier: string;
  location: string;
  specificLocation?: string;
  category: string;
  description: string;
  status: Status;
  submittedAt: Date;
  urgency: Urgency;
  photos: string[]; // Array of base64 encoded images
}

export enum Role {
  Mahasiswa = 'Mahasiswa',
  Dosen = 'Dosen',
  Pegawai = 'Pegawai',
  Admin = 'Admin',
}

export interface User {
  name: string;
  userIdentifier: string;
  password: string; // Dalam aplikasi nyata, ini harus berupa hash
  role: Role;
}