
import React, { useState, useMemo } from 'react';
import { Report, Status, Role } from '../types';
import ReportList from './ReportList';
import { ArchiveIcon } from './icons/ArchiveIcon';
import { ClockIcon } from './icons/ClockIcon';
import { RefreshCwIcon } from './icons/RefreshCwIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { REPORT_CATEGORIES } from '../constants';

interface AdminViewProps {
  reports: Report[];
  updateReportStatus: (id: string, newStatus: Status) => void;
}

interface DashboardCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
  color: {
    bg: string;
    text: string;
  };
}

const DashboardCard: React.FC<DashboardCardProps> = ({ icon, title, value, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4 transition-transform hover:scale-105 duration-300">
    <div className={`rounded-full p-3 ${color.bg}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

const AdminView: React.FC<AdminViewProps> = ({ reports, updateReportStatus }) => {
    const [statusFilter, setStatusFilter] = useState<string>('All');
    const [categoryFilter, setCategoryFilter] = useState<string>('All');

    const totalReports = reports.length;
    const pendingReports = reports.filter(r => r.status === Status.Pending).length;
    const inProgressReports = reports.filter(r => r.status === Status.InProgress).length;
    const resolvedReports = reports.filter(r => r.status === Status.Resolved).length;

    const filteredReports = useMemo(() => {
        return reports.filter(report => {
            const statusMatch = statusFilter === 'All' || report.status === statusFilter;
            const categoryMatch = categoryFilter === 'All' || report.category === categoryFilter;
            return statusMatch && categoryMatch;
        });
    }, [reports, statusFilter, categoryFilter]);

    const clearFilters = () => {
        setStatusFilter('All');
        setCategoryFilter('All');
    };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard 
          title="Total Laporan"
          value={totalReports}
          icon={<ArchiveIcon className="w-6 h-6 text-gray-600" />}
          color={{ bg: 'bg-gray-200', text: 'text-gray-800' }}
        />
        <DashboardCard 
          title="Menunggu"
          value={pendingReports}
          icon={<ClockIcon className="w-6 h-6 text-yellow-800" />}
          color={{ bg: 'bg-yellow-100', text: 'text-yellow-800' }}
        />
        <DashboardCard 
          title="Dalam Proses"
          value={inProgressReports}
          icon={<RefreshCwIcon className="w-6 h-6 text-blue-800" />}
          color={{ bg: 'bg-blue-100', text: 'text-blue-800' }}
        />
        <DashboardCard 
          title="Selesai"
          value={resolvedReports}
          icon={<CheckCircleIcon className="w-6 h-6 text-green-800" />}
          color={{ bg: 'bg-green-100', text: 'text-green-800' }}
        />
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
                <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
                <select id="status-filter" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary transition">
                    <option value="All">Semua Status</option>
                    {Object.values(Status).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </div>
            <div>
                <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">Filter by Kategori</label>
                <select id="category-filter" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary transition">
                    <option value="All">Semua Kategori</option>
                    {REPORT_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>
            <button onClick={clearFilters} className="w-full md:w-auto justify-self-end bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-all duration-300">
                Bersihkan Filter
            </button>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-6 text-brand-primary-dark">Manajemen Laporan Masuk</h2>
      <ReportList reports={filteredReports} role={Role.Admin} updateReportStatus={updateReportStatus} />
    </div>
  );
};

export default AdminView;
