
import React, { useState, useCallback, useEffect } from 'react';
import { Report, Role, Status, Urgency, User } from './types';
import Header from './components/Header';
import StudentView from './components/StudentView';
import AdminView from './components/AdminView';
import Login from './components/Login';
import Register from './components/Register';
import AdminLogin from './components/AdminLogin';
import ProfilePage from './components/ProfilePage';

// Data awal hanya untuk pemuatan pertama kali jika localStorage kosong
const initialMockReports: Report[] = [
    {
      id: '1',
      name: 'Budi Hartono',
      userIdentifier: 'budi.hartono@email.com',
      location: 'Perpustakaan Pusat',
      specificLocation: 'Ruang Baca Lantai 2, dekat rak buku fiksi',
      category: 'Kerusakan AC',
      description: 'AC di lantai 2 tidak dingin sama sekali, sangat panas dan tidak nyaman untuk belajar.',
      status: Status.Pending,
      submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      urgency: Urgency.Tinggi,
      photos: [],
    },
    {
      id: '2',
      name: 'Citra Lestari',
      userIdentifier: 'citralestari',
      location: 'Kantin Pusat (Food Court)',
      category: 'Kebersihan',
      description: 'Banyak sampah berserakan di bawah meja dan tidak ada petugas yang membersihkan.',
      status: Status.InProgress,
      submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      urgency: Urgency.Sedang,
      photos: [],
    },
    {
      id: '3',
      name: 'Dewi Anggraini',
      userIdentifier: 'd.anggraini@email.com',
      location: 'Fakultas Teknik - Gedung A',
      specificLocation: 'Ruang Kelas T-201',
      category: 'Fasilitas Belajar',
      description: 'Proyektor di ruang kelas T-201 mati dan tidak bisa digunakan untuk presentasi.',
      status: Status.Resolved,
      submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      urgency: Urgency.Rendah,
      photos: [],
    },
];

const REPORTS_STORAGE_KEY = 'campusReports-shared';
const USERS_STORAGE_KEY = 'campusUsers';


const App: React.FC = () => {
  const [userRole, setUserRole] = useState<Role | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<'login' | 'register' | 'adminLogin'>('login');
  const [mainView, setMainView] = useState<'dashboard' | 'profile'>('dashboard');

  const [reports, setReports] = useState<Report[]>(() => {
    try {
      const savedReports = localStorage.getItem(REPORTS_STORAGE_KEY);
      if (savedReports) {
        return JSON.parse(savedReports).map((report: any) => ({
          ...report,
          submittedAt: new Date(report.submittedAt),
        }));
      }
    } catch (error) {
      console.error("Gagal memuat laporan dari localStorage:", error);
    }
    return initialMockReports;
  });
  
  useEffect(() => {
    try {
      localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(reports));
    } catch (error) {
      console.error("Gagal menyimpan laporan ke localStorage:", error);
    }
  }, [reports]);

  const [users, setUsers] = useState<User[]>(() => {
    try {
      const savedUsers = localStorage.getItem(USERS_STORAGE_KEY);
      return savedUsers ? JSON.parse(savedUsers) : [];
    } catch (error) {
      console.error("Gagal memuat pengguna dari localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    } catch (error) {
      console.error("Gagal menyimpan pengguna ke localStorage:", error);
    }
  }, [users]);


  const addReport = useCallback((newReport: Omit<Report, 'id' | 'status' | 'submittedAt'>) => {
    const report: Report = {
      ...newReport,
      id: new Date().toISOString(),
      status: Status.Pending,
      submittedAt: new Date(),
    };
    setReports(prevReports => [report, ...prevReports]);
  }, []);

  const updateReportStatus = useCallback((id: string, newStatus: Status) => {
    setReports(prevReports =>
      prevReports.map(report =>
        report.id === id ? { ...report, status: newStatus } : report
      )
    );
  }, []);
  
  const handleRegister = async (newUser: User): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      return await res.json();
    } catch (error) {
      console.error("Error register:", error);
      return { success: false, message: "Server error" };
    }
  };

  
  const handleLogin = async (userIdentifier: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userIdentifier, password }),
      });

      const data = await res.json();

      if (data.success) {
        setUserRole(data.user.role);
        setCurrentUser(data.user);
        setMainView("dashboard");
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error login:", error);
      return false;
    }
  };

  
  const handleAdminLogin = (user_identifier: string, password: string): boolean => {
    if (user_identifier === 'admin1' && password === '123456') {
      setUserRole(Role.Admin);
      setCurrentUser({ name: 'Admin Fasilkom', userIdentifier: 'admin1', password: '', role: Role.Admin });
      setMainView('dashboard');
      return true;
    }
    return false;
  }

  const handleLogout = () => {
    setUserRole(null);
    setCurrentUser(null);
    setCurrentView('login');
    setMainView('dashboard');
  };
  
  const handleSwitchToProfile = () => setMainView('profile');
  const handleSwitchToDashboard = () => setMainView('dashboard');

  if (!userRole) {
    switch (currentView) {
      case 'register':
        return <Register onSwitchToLogin={() => setCurrentView('login')} onRegister={handleRegister} />;
      case 'adminLogin':
        return <AdminLogin onLogin={handleAdminLogin} onSwitchToLogin={() => setCurrentView('login')} />;
      case 'login':
      default:
        return <Login onLogin={handleLogin} onSwitchToRegister={() => setCurrentView('register')} onSwitchToAdminLogin={() => setCurrentView('adminLogin')} />;
    }
  }

  return (
    <div className="min-h-screen bg-brand-background text-brand-text">
      <Header 
        role={userRole} 
        currentUser={currentUser}
        onLogout={handleLogout} 
        onSwitchToProfile={handleSwitchToProfile}
      />
      <main className="container mx-auto p-4 md:p-8">
        {mainView === 'profile' && currentUser ? (
          <ProfilePage 
            currentUser={currentUser} 
            allReports={reports}
            onBackToDashboard={handleSwitchToDashboard}
            userRole={userRole}
          />
        ) : (
          <>
            {userRole === Role.Admin ? (
              <AdminView reports={reports} updateReportStatus={updateReportStatus} />
            ) : (
              <StudentView reports={reports} addReport={addReport} currentUser={currentUser} userRole={userRole} />
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default App;