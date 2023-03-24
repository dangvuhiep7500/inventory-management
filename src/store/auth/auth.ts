import {create} from "zustand";
import { combine } from "zustand/middleware";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
}

interface AuthState {
  isLoading: boolean;
  user: User | null;
  error: string | null;
}

const initialState: AuthState = {
  isLoading: false,
  user: null,
  error: null,
};

export const useAuthStore = create<AuthState>(
   (set) => ({
    isLoading: false,
    user: null,
    error: null,
    login: async (username: string, password: string) => {
      set({ isLoading: true, error: null });
      try {
        const res = await fetch("https://localhost:5000/api/Account/login", {
          method: "POST",
          body: JSON.stringify({ username, password }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(res);
        if (res.status === 200) {
          const data = await res.json();
          set({ isLoading: false, user: data.user, error: null });
        } else {
          const data = await res.json();
          set({ isLoading: false, user: null, error: data.message });
        }
      } catch (error: any) {
        set({ isLoading: false, user: null, error: error.message });
      }
    },
    logout: () => {
      set({ isLoading: false, user: null, error: null });
    },
  })
);