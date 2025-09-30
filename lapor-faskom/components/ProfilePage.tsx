
import React from 'react';
import { User, Report, Role } from '../types';
import ReportList from './ReportList';
import { AtSignIcon } from './icons/AtSignIcon';
import { UserProfileIllustration } from './illustrations/UserProfileIllustration';

interface ProfilePageProps {
  currentUser: User;
  allReports: Report[];
  onBackToDashboard: () => void;
  userRole: Role;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ currentUser, allReports, onBackToDashboard, userRole }) => {

  const userReports = userRole === Role.Admin 
    ? [] 
    : allReports.filter(report => report.userIdentifier === currentUser.userIdentifier);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-brand-primary-dark/20 rounded-full p-2 flex-shrink-0">
                <UserProfileIllustration className="text-brand-primary" />
            </div>
            <div>
                <h1 className="text-3xl font-bold text-gray-800">{currentUser.name}</h1>
                <div className="flex items-center gap-2 text-gray-500 mt-2">
                    <AtSignIcon className="w-5 h-5"/>
                    <span>{currentUser.userIdentifier}</span>
                </div>
                 <span className="mt-2 inline-block text-sm font-semibold bg-brand-primary-dark/30 text-brand-text px-3 py-1 rounded-full">{userRole}</span>
            </div>
        </div>
      </div>
      
      {userRole !== Role.Admin && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-brand-primary-dark">Laporan Saya</h2>
          <ReportList reports={userReports} role={userRole} />
        </div>
      )}

      <div className="mt-8 text-center">
        <button
          onClick={onBackToDashboard}
          className="bg-brand-primary text-brand-text font-bold py-2 px-6 rounded-md hover:bg-brand-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-all duration-300 shadow-lg"
        >
          Kembali ke Dashboard
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;