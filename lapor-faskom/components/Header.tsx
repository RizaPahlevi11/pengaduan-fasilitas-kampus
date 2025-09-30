
import React from 'react';
import { Role, User } from '../types';
import { ClipboardListIcon } from './icons/ClipboardListIcon';
import { UserCircleIcon } from './icons/UserCircleIcon';

interface HeaderProps {
  role: Role;
  currentUser: User | null;
  onLogout: () => void;
  onSwitchToProfile: () => void;
}

const Header: React.FC<HeaderProps> = ({ role, currentUser, onLogout, onSwitchToProfile }) => {
  return (
    <header className="bg-brand-primary text-brand-text shadow-lg">
      <div className="container mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          <ClipboardListIcon className="w-8 h-8" />
          <h1 className="text-2xl font-bold tracking-tight">
            Sistem Pelaporan Fasilitas Fasilkom
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <UserCircleIcon className="w-6 h-6" />
            <span className="text-sm font-semibold">
              {currentUser?.name || role}
            </span>
          </div>
          <button
            onClick={onSwitchToProfile}
            className="px-4 py-1.5 text-sm font-semibold rounded-full transition-colors duration-300 bg-brand-primary-dark/30 text-brand-text hover:bg-brand-primary-dark/50"
          >
            Profil
          </button>
          <button
            onClick={onLogout}
            className="px-4 py-1.5 text-sm font-semibold rounded-full transition-colors duration-300 bg-white text-brand-primary-dark shadow hover:bg-gray-200"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
