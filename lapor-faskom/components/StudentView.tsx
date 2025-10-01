
import React from 'react';
import { Report, User } from '../types';
import ReportForm from './ReportForm';
import ReportList from './ReportList';
import { Role } from '../types';

interface StudentViewProps {
  reports: Report[];
  addReport: (newReport: Omit<Report, 'id' | 'status' | 'submittedAt'>) => void;
  currentUser: User | null;
  userRole: Role;
}

const StudentView: React.FC<StudentViewProps> = ({ reports, addReport, currentUser, userRole }) => {
  console.log("🎓 StudentView rendered");
  console.log("   Current user:", currentUser);
  console.log("   All reports:", reports);

  const userReports = currentUser
    ? reports.filter((report) => {
        console.log(`Checking report ${report.id}:`, report.userIdentifier, "===", currentUser.userIdentifier);
        return report.userIdentifier === currentUser.userIdentifier;
      })
    : [];

  console.log("Filtered user reports:", userReports);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <h2 className="text-2xl font-bold mb-4 text-brand-primary-dark">Buat Laporan Baru</h2>
        <ReportForm addReport={addReport} currentUser={currentUser} />
      </div>
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-bold mb-4 text-brand-primary-dark">Daftar Laporan Saya ({userReports.length})</h2>
        {userReports.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <p className="text-gray-500">Belum ada laporan.</p>
            <p className="text-sm text-gray-400 mt-2">Silakan buat laporan baru jika Anda menemukan masalah.</p>
          </div>
        ) : (
          <ReportList reports={userReports} role={userRole} />
        )}
      </div>
    </div>
  );
};
export default StudentView;