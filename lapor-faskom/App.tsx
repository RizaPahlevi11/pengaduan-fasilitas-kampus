import React, { useState, useCallback, useEffect } from "react";
import { Report, Role, Status, Urgency, User } from "./types";
import Header from "./components/Header";
import StudentView from "./components/StudentView";
import AdminView from "./components/AdminView";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminLogin from "./components/AdminLogin";
import ProfilePage from "./components/ProfilePage";

const App: React.FC = () => {
  
  const [userRole, setUserRole] = useState<Role | null>(() => {
  const savedRole = localStorage.getItem("userRole");
  return savedRole ? (savedRole as Role) : null;
});

const [currentUser, setCurrentUser] = useState<User | null>(() => {
  const savedUser = localStorage.getItem("currentUser");
  return savedUser ? JSON.parse(savedUser) : null;
});
  const [currentView, setCurrentView] = useState<"login" | "register" | "adminLogin">("login");
  const [mainView, setMainView] = useState<"dashboard" | "profile">("dashboard");
  const [reports, setReports] = useState<Report[]>([]);
  const fetchReports = useCallback(async () => {
    if (!currentUser) {
      console.log("⚠️ No current user, skipping fetch");
      return;
    }
    try {
      let url = "http://localhost:5000/api/reports";
      if (userRole !== Role.Admin) {
        url += `?userIdentifier=${encodeURIComponent(currentUser.userIdentifier)}`;
      }
      console.log("📡 Fetching from:", url);
      console.log("👤 Current user:", currentUser);
      const res = await fetch(url);
      const data = await res.json();
      console.log("📦 Response data:", data);
      console.log("📊 Reports count:", data.reports?.length || 0);
      if (data.success && Array.isArray(data.reports)) {
        const reportsArray: Report[] = data.reports.map((r: any) => {
          console.log(" Mapping report:", r.id, r.userIdentifier);
          return {
            id: String(r.id),
            name: r.name,
            userIdentifier: r.userIdentifier,
            location: r.location,
            specificLocation: r.specificLocation || "",
            category: r.category,
            description: r.description,
            status: r.status,
            submittedAt: new Date(r.submittedAt),
            urgency: r.urgency,
            photos: Array.isArray(r.photos) ? r.photos : [],
          };
        });
        console.log("✅ Setting reports, count:", reportsArray.length);
        console.log("📋 Reports data:", reportsArray);
        setReports(reportsArray);
      } else {
        console.log("⚠️ No reports or invalid response");
        setReports([]);
      }
    } catch (err) {
      console.error("❌ Fetch error:", err);
      setReports([]);
    }
  }, [currentUser, userRole]);

  useEffect(() => {
    console.log("🔄 useEffect triggered - fetchReports");
    fetchReports();
  }, [fetchReports]);

  const addReport = useCallback(
    async (newReport: Omit<Report, "id" | "status" | "submittedAt">) => {
      try {
        console.log("📤 Submitting report:", newReport);
        const res = await fetch("http://localhost:5000/api/reports", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newReport),
        });
        const data = await res.json();
        console.log("📨 Submit response:", data);
        if (data.success) {
          console.log("✅ Report submitted, fetching updated list...");
          await fetchReports();
        } else {
          console.error("❌ Submit failed:", data.message);
          throw new Error(data.message || "Gagal mengirim laporan");
        }
      } catch (error) {
        console.error("❌ Error submitting report:", error);
        throw error;
      }
    },
    [fetchReports]
  );

  const updateReportStatus = useCallback((id: string, newStatus: Status) => {
    setReports((prevReports) => prevReports.map((report) => (report.id === id ? { ...report, status: newStatus } : report)));
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

      // ✅ simpan session ke localStorage
      localStorage.setItem("currentUser", JSON.stringify(data.user));
      localStorage.setItem("userRole", data.user.role);

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
    if (user_identifier === "admin1" && password === "123456") {
      setUserRole(Role.Admin);
      setCurrentUser({
        name: "Admin Fasilkom",
        userIdentifier: "admin1",
        password: "",
        role: Role.Admin,
      });
      setMainView("dashboard");
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentUser(null);
    setCurrentView("login");
    setMainView("dashboard");
    setReports([]);
  };

  const handleSwitchToProfile = () => setMainView("profile");
  const handleSwitchToDashboard = () => setMainView("dashboard");

  if (!userRole) {
    switch (currentView) {
      case "register":
        return <Register onSwitchToLogin={() => setCurrentView("login")} onRegister={handleRegister} />;
      case "adminLogin":
        return <AdminLogin onLogin={handleAdminLogin} onSwitchToLogin={() => setCurrentView("login")} />;
      default:
        return (
          <Login
            onLogin={handleLogin}
            onSwitchToRegister={() => setCurrentView("register")}
            onSwitchToAdminLogin={() => setCurrentView("adminLogin")}
          />
        );
    }
  }

  return (
    <div className="min-h-screen bg-brand-background text-brand-text">
      <Header role={userRole} currentUser={currentUser} onLogout={handleLogout} onSwitchToProfile={handleSwitchToProfile} />
      <main className="container mx-auto p-4 md:p-8">
        {mainView === "profile" && currentUser ? (
          <ProfilePage currentUser={currentUser} allReports={reports} onBackToDashboard={handleSwitchToDashboard} userRole={userRole} />
        ) : userRole === Role.Admin ? (
          <AdminView reports={reports} updateReportStatus={updateReportStatus} />
        ) : (
          <StudentView reports={reports} addReport={addReport} currentUser={currentUser} userRole={userRole} />
        )}
      </main>
    </div>
  );
};

export default App;
