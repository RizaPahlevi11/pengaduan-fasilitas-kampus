
import React, { useState } from 'react';
import { Role } from '../types';
import { UserIcon } from './icons/UserIcon';
import { LockIcon } from './icons/LockIcon';
import { ShieldIcon } from './icons/ShieldIcon';

interface AdminLoginProps {
  onLogin: (userIdentifier: string, password: string) => boolean;
  onSwitchToLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onSwitchToLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const success = onLogin(username, password);
    if (!success) {
      setError('Email/Username atau Kata Sandi Admin salah.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 p-4">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-2xl shadow-xl">
        <div className="text-center">
          <div className="flex justify-center items-center gap-3 mb-2">
            <ShieldIcon className="w-10 h-10 text-amber-600" />
            <h1 className="text-3xl font-bold text-gray-800">
              Admin Login
            </h1>
          </div>
          <p className="text-gray-600">Akses panel manajemen fasilitas.</p>
        </div>

        <form onSubmit={handleAdminLoginSubmit} className="space-y-4 pt-4">
           <div>
            <label htmlFor="username" className="sr-only">Email / Username</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                 <UserIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="w-full rounded-md border border-gray-300 bg-gray-50 py-2.5 pl-10 pr-3 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm"
                placeholder="Email / Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <div className="relative">
               <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                 <LockIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full rounded-md border border-gray-300 bg-gray-50 py-2.5 pl-10 pr-3 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {error && <p className="text-sm text-red-600 bg-red-50 p-2 rounded-md text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-amber-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-600 transition-colors duration-300 shadow-md"
          >
            Masuk sebagai Admin
          </button>
        </form>
        
        <div className="text-sm text-center text-gray-500">
          Bukan admin?{' '}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onSwitchToLogin();
            }}
            className="font-semibold leading-6 text-amber-600 hover:text-amber-700"
          >
            Kembali ke login pengguna
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;