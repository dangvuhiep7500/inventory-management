import { create } from "zustand";
import Cookies from "js-cookie";
import axios, { AxiosError } from "axios";
import instance from "../axios/api";
type CurrentUser = {
    userName: string;
    userEmail: string;
    isLoading: boolean;
    error: string | null;
    currentUser: () => void;
  }
  
  export const useUserStore = create<CurrentUser>((set) => ({
    userName: "",
    userEmail: "",
    isLoading: false,
    error: null,
    currentUser: async () => {
      set({ isLoading: true, error: null });
      try {
        const response = await instance.get(
          "https://localhost:5000/auth/currentuser",
        );
        set({ isLoading: false,userName: response.data.userName, userEmail: response.data.userEmail, error: null });
      } catch (error: AxiosError | unknown) {
        if (axios.isAxiosError(error)) {
          set({
            isLoading: false, error: error.response?.data?.message || error.message,
          });
        }
      }
    },
  }));