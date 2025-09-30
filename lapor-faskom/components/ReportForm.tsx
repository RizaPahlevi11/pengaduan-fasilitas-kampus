
import React, { useState, useEffect } from 'react';
import { Report, Urgency, User } from '../types';
import { REPORT_CATEGORIES, REPORT_URGENCIES } from '../constants';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { PaperclipIcon } from './icons/PaperclipIcon';
import { XIcon } from './icons/XIcon';

interface ReportFormProps {
  addReport: (newReport: Omit<Report, 'id' | 'status' | 'submittedAt'>) => void;
  currentUser: User | null;
}

const MAX_PHOTOS = 3;
const MAX_FILE_SIZE_MB = 2;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const ReportForm: React.FC<ReportFormProps> = ({ addReport, currentUser }) => {
  const [name, setName] = useState<string>('');
  const [userIdentifier, setUserIdentifier] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [specificLocation, setSpecificLocation] = useState<string>('');
  const [category, setCategory] = useState<string>(REPORT_CATEGORIES[0]);
  const [description, setDescription] = useState<string>('');
  const [urgency, setUrgency] = useState<Urgency>(Urgency.Rendah);
  const [photos, setPhotos] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setUserIdentifier(currentUser.userIdentifier);
    }
  }, [currentUser]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const totalPhotos = photos.length + files.length;

      if (totalPhotos > MAX_PHOTOS) {
        alert(`Anda hanya dapat mengunggah maksimal ${MAX_PHOTOS} foto.`);
        return;
      }

      files.forEach(file => {
        if (file.size > MAX_FILE_SIZE_BYTES) {
          alert(`Ukuran file "${file.name}" terlalu besar. Maksimal ${MAX_FILE_SIZE_MB} MB.`);
          return;
        }
        if (!file.type.startsWith('image/')) {
            alert(`File "${file.name}" bukan gambar.`);
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setPhotos(prevPhotos => [...prevPhotos, event.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };
  
  const handleRemovePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !userIdentifier.trim() || !location.trim() || !description.trim()) {
      alert('Nama Pelapor, Email/Username, Lokasi, dan Deskripsi tidak boleh kosong.');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitSuccess(false);

    // Simulate network request
    setTimeout(() => {
      addReport({ name, userIdentifier, location, specificLocation, category, description, urgency, photos });
      // Reset only fields that are not pre-filled
      setDescription('');
      setLocation('');
      setSpecificLocation('');
      setCategory(REPORT_CATEGORIES[0]);
      setUrgency(Urgency.Rendah);
      setPhotos([]);
      
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Nama Pelapor
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary transition bg-gray-100 cursor-not-allowed"
          placeholder="Masukkan nama lengkap Anda"
          disabled
          required
        />
      </div>
       <div>
        <label htmlFor="userIdentifier" className="block text-sm font-medium text-gray-700 mb-1">
          Email / Username
        </label>
        <input
          type="text"
          id="userIdentifier"
          value={userIdentifier}
          onChange={(e) => setUserIdentifier(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary transition bg-gray-100 cursor-not-allowed"
          placeholder="Masukkan Email atau Username Anda"
          disabled
          required
        />
      </div>
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
          Lokasi
        </label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary transition"
          placeholder="Contoh: Perpustakaan Pusat, Lantai 2"
          disabled={isSubmitting}
          required
        />
      </div>
       <div>
        <label htmlFor="specificLocation" className="block text-sm font-medium text-gray-700 mb-1">
          Lokasi Spesifik (Opsional)
        </label>
        <input
          type="text"
          id="specificLocation"
          value={specificLocation}
          onChange={(e) => setSpecificLocation(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary transition"
          placeholder="Contoh: Ruang T-201, Toilet Pria Lt. 2"
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Kategori
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary transition"
          disabled={isSubmitting}
        >
          {REPORT_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
       <div>
        <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-1">
          Tingkat Urgensi
        </label>
        <select
          id="urgency"
          value={urgency}
          onChange={(e) => setUrgency(e.target.value as Urgency)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary transition"
          disabled={isSubmitting}
        >
          {REPORT_URGENCIES.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Deskripsi Laporan
        </label>
        <textarea
          id="description"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary transition"
          placeholder="Jelaskan masalah yang Anda temukan secara detail..."
          disabled={isSubmitting}
        ></textarea>
      </div>
      <div>
        <label htmlFor="photos" className="block text-sm font-medium text-gray-700 mb-1">
          Lampirkan Foto (Max {MAX_PHOTOS}, @ {MAX_FILE_SIZE_MB}MB)
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
                <PaperclipIcon className="mx-auto h-12 w-12 text-gray-400" />
                 <div className="flex text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-brand-primary-dark hover:text-brand-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-primary">
                        <span>Unggah file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple accept="image/*" onChange={handlePhotoChange} disabled={isSubmitting || photos.length >= MAX_PHOTOS} />
                    </label>
                    <p className="pl-1">atau seret dan lepas</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF hingga {MAX_FILE_SIZE_MB}MB</p>
            </div>
        </div>
        {photos.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-4">
                {photos.map((photo, index) => (
                    <div key={index} className="relative group">
                        <img src={photo} alt={`Preview ${index + 1}`} className="h-24 w-full object-cover rounded-md" />
                        <button type="button" onClick={() => handleRemovePhoto(index)} className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <XIcon className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-brand-primary text-brand-text font-bold py-2 px-4 rounded-md hover:bg-brand-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-all duration-300 shadow-lg flex items-center justify-center disabled:bg-yellow-300 disabled:cursor-not-allowed"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <SpinnerIcon className="animate-spin -ml-1 mr-3 h-5 w-5" />
            Mengirim...
          </>
        ) : (
          'Kirim Laporan'
        )}
      </button>
      {submitSuccess && (
        <div className="flex items-center gap-2 text-green-700 bg-green-100 p-3 rounded-md">
            <CheckCircleIcon className="w-5 h-5"/>
            <p className="text-sm font-medium">Laporan berhasil dikirim!</p>
        </div>
      )}
    </form>
  );
};

export default ReportForm;
