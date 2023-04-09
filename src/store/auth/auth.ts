import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Cookies from "js-cookie";
import axios, { AxiosError } from "axios";
import instance from "../axios/api";
import { type } from "os";
interface RegisterUser {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}
interface AuthUser {
  username: string;
  password: string;
}
type CurrentUser = {
  userName: string;
  userEmail: string;
  currentUser: () => void;
}

type AuthActions = {
  isLoading: boolean;
  successLogin: boolean;
  successRegister: boolean;
  refreshToken: string | null;
  error: string | null;
  login: ({ username, password }: AuthUser) => void;
  register: ({
    lastName,
    firstName,
    email,
    username,
    password,
  }: RegisterUser) => void;
  setRefreshToken: (refreshToken: string | null) => void;
  clear: () => void;
};
export const useAuthStore = create<AuthActions & CurrentUser>()(
  persist(
    (set) => ({
      isLoading: false,
      successLogin: false,
      successRegister: false,
      refreshToken: null,
      error: null,
      userName: "",
      userEmail: "",
      login: async ({ username, password }: AuthUser) => {
        set({ isLoading: true, error: null });
        try {
          const token = Cookies.get("accessToken");
          const { data } = await axios.post(
            "https://localhost:5000/auth/login",
            { username, password },
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          set({
            isLoading: true,
            successLogin: true,
            error: null,
            refreshToken: data.refreshToken,
          });
          Cookies.set("accessToken", data.token);
        } catch (error: AxiosError | unknown) {
          if (axios.isAxiosError(error)) {
            set({
              isLoading: false,
              error: error.response?.data?.message || error.message,
            });
          }
        }
      },
      register: async ({
        lastName,
        firstName,
        email,
        username,
        password,
      }: RegisterUser) => {
        set({ isLoading: true, error: null });
        try {
          await axios.post(
            "https://localhost:5000/auth/register-user",
            { lastName, firstName, email, username, password },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          set({ successRegister: true, error: null });
        } catch (error: AxiosError | unknown) {
          if (axios.isAxiosError(error)) {
            set({
              isLoading: false,
              successRegister: false,
              error: error.response?.data?.message || error.message,
            });
          }
        }
      },
      currentUser: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await instance.get(
            "https://localhost:5000/auth/currentuser"
          );
          set({ userName: response.data.userName, userEmail: response.data.userEmail, error: null });
        } catch (error: AxiosError | unknown) {
          if (axios.isAxiosError(error)) {
            set({
              isLoading: false,
              error: error.response?.data?.message || error.message,
            });
          }
        }
      },
      setRefreshToken: (refreshToken) => {
        set({ refreshToken });
      },
      clear: () => {
        set({ isLoading: false, error: null });
        localStorage.clear();
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ successLogin: state.successLogin }),
    }
  )
);
