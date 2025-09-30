
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
  const userReports = currentUser 
    ? reports.filter(report => report.userIdentifier === currentUser.userIdentifier)
    : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <h2 className="text-2xl font-bold mb-4 text-brand-primary-dark">Buat Laporan Baru</h2>
        <ReportForm addReport={addReport} currentUser={currentUser} />
      </div>
      <div className="lg:col-span-2">
         <h2 className="text-2xl font-bold mb-4 text-brand-primary-dark">Daftar Laporan Saya</h2>
        <ReportList reports={userReports} role={userRole} />
      </div>
    </div>
  );
};

export default StudentView;