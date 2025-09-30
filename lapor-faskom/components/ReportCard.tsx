import React from 'react';
import { Report, Role, Status, Urgency } from '../types';
import { BuildingIcon } from './icons/BuildingIcon';
import { WrenchIcon } from './icons/WrenchIcon';
import { CalendarIcon } from './icons/CalendarIcon';
import { AlertTriangleIcon } from './icons/AlertTriangleIcon';
import { PaperclipIcon } from './icons/PaperclipIcon';
import { UserIcon } from './icons/UserIcon';
import { AtSignIcon } from './icons/AtSignIcon';

interface ReportCardProps {
  report: Report;
  role: Role;
  updateReportStatus?: (id: string, newStatus: Status) => void;
}

const statusStyles: { [key in Status]: { bg: string; text: string; ring: string; border: string; } } = {
  [Status.Pending]: { bg: 'bg-yellow-100', text: 'text-yellow-800', ring: 'ring-yellow-600/20', border: 'border-l-4 border-status-pending' },
  [Status.InProgress]: { bg: 'bg-blue-100', text: 'text-blue-800', ring: 'ring-blue-600/20', border: 'border-l-4 border-status-progress' },
  [Status.Resolved]: { bg: 'bg-green-100', text: 'text-green-800', ring: 'ring-green-600/20', border: 'border-l-4 border-status-resolved' },
};

const urgencyStyles: { [key in Urgency]: { bg: string; text: string; ring: string; } } = {
    [Urgency.Rendah]: { bg: 'bg-green-100', text: 'text-green-800', ring: 'ring-green-600/20' },
    [Urgency.Sedang]: { bg: 'bg-yellow-100', text: 'text-yellow-800', ring: 'ring-yellow-600/20' },
    [Urgency.Tinggi]: { bg: 'bg-red-100', text: 'text-red-800', ring: 'ring-red-600/20' },
};

const StatusBadge: React.FC<{ status: Status }> = ({ status }) => {
  const styles = statusStyles[status];
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${styles.bg} ${styles.text} ring-1 ring-inset ${styles.ring}`}
    >
      {status}
    </span>
  );
};

const UrgencyBadge: React.FC<{ urgency: Urgency }> = ({ urgency }) => {
    const styles = urgencyStyles[urgency];
    return (
      <span
        className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium ${styles.bg} ${styles.text} ring-1 ring-inset ${styles.ring}`}
      >
        <AlertTriangleIcon className="w-3 h-3" />
        {urgency}
      </span>
    );
};


const ReportCard: React.FC<ReportCardProps> = ({ report, role, updateReportStatus }) => {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (updateReportStatus) {
      updateReportStatus(report.id, e.target.value as Status);
    }
  };
  
  const formattedDate = new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(report.submittedAt);

  const cardStyles = statusStyles[report.status];

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${cardStyles.border}`}>
      <div className="p-5">
        <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2 text-gray-800 font-semibold">
              <UserIcon className="w-4 h-4 text-gray-600" />
              <span>{report.name}</span>
            </div>
            <div className="pl-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <AtSignIcon className="w-4 h-4" />
                    <span>{report.userIdentifier}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                    <BuildingIcon className="w-4 h-4" />
                    <span>{report.location}</span>
                </div>
                {report.specificLocation && (
                <div className="text-sm text-gray-500 mt-1 pl-6">
                    <span>{report.specificLocation}</span>
                </div>
                )}
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                    <WrenchIcon className="w-4 h-4" />
                    <span>{report.category}</span>
                </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <UrgencyBadge urgency={report.urgency} />
            <StatusBadge status={report.status} />
          </div>
        </div>
        <p className="text-gray-700 leading-relaxed my-3">{report.description}</p>
        
        {report.photos && report.photos.length > 0 && (
            <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
                    <PaperclipIcon className="w-4 h-4" />
                    Lampiran Foto
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {report.photos.map((photo, index) => (
                        <a key={index} href={photo} target="_blank" rel="noopener noreferrer">
                             <img src={photo} alt={`Lampiran ${index + 1}`} className="h-24 w-full object-cover rounded-md border border-gray-200 hover:opacity-80 transition-opacity" />
                        </a>
                    ))}
                </div>
            </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-gray-400 mt-4">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" />
            <span>Dilaporkan pada: {formattedDate}</span>
          </div>
          {role === Role.Admin && updateReportStatus && (
            <div className="mt-3 sm:mt-0">
              <label htmlFor={`status-${report.id}`} className="sr-only">Ubah Status</label>
              <select
                id={`status-${report.id}`}
                value={report.status}
                onChange={handleStatusChange}
                className="text-xs p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary transition"
              >
                {Object.values(Status).map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportCard;