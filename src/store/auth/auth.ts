import {create} from "zustand";
import Cookies from "js-cookie";

type AuthActions = {
  isLoading: boolean;
  error: string | null;
  refreshToken: string | null;
  login: (username: string,password: string ) => void;
};

export const useAuthStore = create<AuthActions>(
   (set) => ({
    isLoading: false,
    refreshToken: null,
    error: null,
    login: async (username: string, password: string) => {
      set({ isLoading: true, error: null });
      try {
        const token = Cookies.get("accessToken");
        const res = await fetch("https://localhost:5000/api/Account/login", {
          method: "POST",
          body: JSON.stringify({ username, password }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          const data = await res.json();
          set({ isLoading: false, refreshToken: data.token, error: null });
          Cookies.set("accessToken", data.token);
        } else {
          const data = await res.json();
          set({ isLoading: false, refreshToken: null, error: data.message });
        }
      } catch (error: any) {
        set({ isLoading: false, refreshToken: null, error: error.message });
      }
    },
    logout: () => {
      set({ isLoading: false, refreshToken: null, error: null });
    },
  })
);