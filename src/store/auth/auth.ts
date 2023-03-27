import {create} from "zustand";
import Cookies from "js-cookie";
import axios, { AxiosError } from "axios";

type AuthActions = {
  isLoading: boolean;
  error: string | null;
  accessToken: string | null;
  login: (username: string,password: string ) => void;
};

export const useAuthStore = create<AuthActions>(
   (set) => ({
    isLoading: false,
    accessToken: null,
    error: null,
    login: async (username: string, password: string) => {
      set({ isLoading: true, error: null });
      const token = Cookies.get("accessToken");
      try {
        const {data} = await axios.post("https://localhost:5000/auth/login", 
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
        set({ isLoading: false, accessToken: data.token, error: null });
        Cookies.set("accessToken", data.token);
      } catch (error: AxiosError | unknown) {
        if (axios.isAxiosError(error)) {
          set({ isLoading: false, accessToken: null, error: error.response?.data?.message || error.message });
        } 
      }
    },
    logout: () => {
      set({ isLoading: false, accessToken: null, error: null });
    },
  })
);