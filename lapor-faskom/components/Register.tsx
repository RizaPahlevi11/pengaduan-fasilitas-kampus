
import React, { useState } from 'react';
import { User, Role } from '../types';
import { CampusIllustration } from './illustrations/CampusIllustration';
import { UserIcon } from './icons/UserIcon';
import { LockIcon } from './icons/LockIcon';
import { AtSignIcon } from './icons/AtSignIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { IdCardIcon } from './icons/IdCardIcon';
import { handleRegister } from '../services/authService'; 

interface RegisterProps {
  onSwitchToLogin: () => void;
  onRegister: (newUser: User) => { success: boolean; message: string };
}

const Register: React.FC<RegisterProps> = ({ onSwitchToLogin, onRegister }) => {
  const [name, setName] = useState('');
  const [userIdentifier, setUserIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<Role>(Role.Mahasiswa);
  
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
   setError(null);

   if (password !== confirmPassword) {
     setError("Kata sandi tidak cocok.");
     return;
   }

   if (password.length < 6) {
     setError("Kata sandi minimal harus 6 karakter.");
     return;
   }

   setIsSubmitting(true);
   setSuccess(false);

   try {
     const result = await handleRegister({ name, userIdentifier, password, role });
     setIsSubmitting(false);

     if (result.success) {
       setSuccess(true);
       // Redirect ke login setelah 2 detik
       setTimeout(() => {
         onSwitchToLogin();
       }, 2000);
     } else {
       setError(result.message);
     }
   } catch (err) {
     setIsSubmitting(false);
     setError("Terjadi kesalahan server.");
   }
 };


  return (
    <div className="flex items-center justify-center min-h-screen bg-brand-background p-4">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-2xl shadow-xl">
        <div className="text-center">
          <CampusIllustration className="w-40 h-auto mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800">
            Buat Akun Baru
          </h1>
          <p className="text-gray-500 mt-1">Daftar untuk mulai melapor.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="sr-only">Nama Lengkap</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <UserIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="name"
                type="text"
                required
                className="w-full rounded-md border border-gray-300 bg-gray-50 py-2.5 pl-10 pr-3 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm"
                placeholder="Nama Lengkap"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSubmitting || success}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="userIdentifier" className="sr-only">Email / Username</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <AtSignIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="userIdentifier"
                type="text"
                required
                className="w-full rounded-md border border-gray-300 bg-gray-50 py-2.5 pl-10 pr-3 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm"
                placeholder="Email / Username"
                value={userIdentifier}
                onChange={(e) => setUserIdentifier(e.target.value)}
                disabled={isSubmitting || success}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="role" className="sr-only">Peran</label>
            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <IdCardIcon className="h-5 w-5 text-gray-400" />
                </div>
                <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value as Role)}
                    className="w-full rounded-md border border-gray-300 bg-gray-50 py-2.5 pl-10 pr-3 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm"
                    disabled={isSubmitting || success}
                >
                    <option value={Role.Mahasiswa}>Mahasiswa</option>
                    <option value={Role.Dosen}>Dosen</option>
                    <option value={Role.Pegawai}>Pegawai</option>
                </select>
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
                type="password"
                required
                className="w-full rounded-md border border-gray-300 bg-gray-50 py-2.5 pl-10 pr-3 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm"
                placeholder="Kata Sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting || success}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="sr-only">Konfirmasi Password</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <LockIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                type="password"
                required
                className="w-full rounded-md border border-gray-300 bg-gray-50 py-2.5 pl-10 pr-3 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm"
                placeholder="Konfirmasi Kata Sandi"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isSubmitting || success}
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-600 bg-red-50 p-2 rounded-md">{error}</p>}
          
          {success && (
             <div className="flex items-center gap-2 text-green-700 bg-green-100 p-3 rounded-md">
                <CheckCircleIcon className="w-5 h-5"/>
                <p className="text-sm font-medium">Pendaftaran berhasil! Mengarahkan ke login...</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-amber-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-600 transition-colors duration-300 shadow-md flex items-center justify-center disabled:bg-amber-400"
            disabled={isSubmitting || success}
          >
            {isSubmitting ? (
              <>
                <SpinnerIcon className="animate-spin -ml-1 mr-3 h-5 w-5" />
                Mendaftar...
              </>
            ) : (
              'Daftar'
            )}
          </button>
        </form>

        <div className="text-sm text-center text-gray-500">
          Sudah punya akun?{' '}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onSwitchToLogin();
            }}
            className="font-semibold leading-6 text-amber-600 hover:text-amber-700"
          >
            Masuk di sini
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;