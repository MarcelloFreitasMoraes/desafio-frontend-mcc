import { create } from "zustand";

interface AuthState {
  user: { name: string; email: string } | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (email, password) => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const { email: storedEmail, password: storedPassword, name } = JSON.parse(storedUser);

      if (storedEmail === email && storedPassword === password) {
        set({ user: { name, email }, isAuthenticated: true });
        return true;
      }
    }

    return false;
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
    localStorage.removeItem("user");
  },

  register: async (name, email, password) => {
    const newUser = { name, email, password };
    localStorage.setItem("user", JSON.stringify(newUser));
    set({ user: { name, email }, isAuthenticated: false });
    return true;
  },
}));
