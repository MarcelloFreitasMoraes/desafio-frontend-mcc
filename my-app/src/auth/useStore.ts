import { create } from "zustand";

interface AuthState {
  user: { name: string; email: string; isAuthenticated: boolean } | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set) => {
  const storedUser = localStorage.getItem("user");

  const initialState = storedUser ? JSON.parse(storedUser) : { user: null, isAuthenticated: false };

  return {
    user: initialState.user,
    isAuthenticated: initialState.isAuthenticated,

    login: async (email, password) => {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        const { email: storedEmail, password: storedPassword, name, isAuthenticated } = JSON.parse(storedUser);

        if (storedEmail === email && storedPassword === password) {
          set({ user: { name, email, isAuthenticated }, isAuthenticated: true });

          const updatedUser = { name, email, password: storedPassword, isAuthenticated: true };
          localStorage.setItem("user", JSON.stringify(updatedUser));

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
      const newUser = { name, email, password, isAuthenticated: false };
      localStorage.setItem("user", JSON.stringify(newUser));
      set({ user: { name, email, isAuthenticated: false }, isAuthenticated: false });
      return true;
    },
  };
});
