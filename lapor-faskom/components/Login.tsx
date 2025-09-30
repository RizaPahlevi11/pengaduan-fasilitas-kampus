
import React, { useState } from 'react';
import { Role } from '../types';
import { ClipboardListIcon } from './icons/ClipboardListIcon';
import { CampusIllustration } from './illustrations/CampusIllustration';
import { UserIcon } from './icons/UserIcon';
import { LockIcon } from './icons/LockIcon';

interface LoginProps {
  onLogin: (userIdentifier: string, password: string) => boolean;
  onSwitchToRegister: () => void;
  onSwitchToAdminLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onSwitchToRegister, onSwitchToAdminLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const success = onLogin(username, password);
    if (!success) {
      setError('Email/Username atau Kata Sandi salah.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-brand-background p-4">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-2xl shadow-xl">
        <div className="text-center">
          <CampusIllustration className="w-48 h-auto mx-auto mb-4" />
          <div className="flex justify-center items-center gap-3 mb-2">
            <ClipboardListIcon className="w-8 h-8 text-brand-primary" />
            <h1 className="text-3xl font-bold text-gray-800">
              Lapor FasKom
            </h1>
          </div>
          <p className="text-gray-600">Pelaporan Fasilitas Fasilkom</p>
        </div>

        <form onSubmit={handleLoginSubmit} className="space-y-4 pt-4">
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
            Masuk
          </button>
        </form>

        <div className="flex items-center">
            <hr className="flex-grow border-gray-200" />
            <span className="mx-4 text-gray-400 text-xs font-semibold">Atau</span>
            <hr className="flex-grow border-gray-200" />
        </div>

        <button
          onClick={onSwitchToAdminLogin}
          className="w-full bg-yellow-100 text-amber-700 font-semibold py-3 px-4 rounded-lg hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-300 shadow-md"
        >
          Login sebagai Admin
        </button>
        
        <div className="text-sm text-center text-gray-500">
          Belum punya akun?{' '}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onSwitchToRegister();
            }}
            className="font-semibold leading-6 text-amber-600 hover:text-amber-700"
          >
            Daftar di sini
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
