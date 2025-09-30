// lapor-faskom/src/services/authService.ts
export interface User {
  name: string;
  userIdentifier: string;
  password: string;
  role: string;
}

export const handleRegister = async (newUser: User): Promise<{ success: boolean; message: string }> => {
  try {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    const data = await res.json();
    if (!res.ok) {
      return { success: false, message: data.message || "Gagal mendaftar" };
    }
    return data;
  } catch (error) {
    console.error("Error register:", error);
    return { success: false, message: "Server error" };
  }
};

export const handleLogin = async (userIdentifier: string, password: string): Promise<{ success: boolean; message: string; user?: any }> => {
  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userIdentifier, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      return { success: false, message: data.message || "Login gagal" };
    }
    return data;
  } catch (error) {
    console.error("Error login:", error);
    return { success: false, message: "Server error" };
  }
};
