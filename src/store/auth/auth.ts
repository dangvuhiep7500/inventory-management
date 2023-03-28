import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Cookies from "js-cookie";
import axios, { AxiosError } from "axios";
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
  clear: () => void;
};
export const useAuthStore = create<AuthActions>()(
  persist(
    (set) => ({
      isLoading: false,
      successLogin: false,
      successRegister: false,
      refreshToken:null,
      error: null,
      login: async ({ username, password }: AuthUser) => {
        set({ isLoading: true, error: null });
        const token = Cookies.get("accessToken");
        try {
          const { data } = await axios.post(
            "https://localhost:5000/auth/login",
            { username, password },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          set({ successLogin: true, error: null, refreshToken: data.refreshToken });
          console.log(data.refreshToken);
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
      clear: () => {
        set({ isLoading: false, error: null });
        localStorage.clear();
        Cookies.remove("accessToken");
      },
    }),
    {
      name: "user-storage", 
      storage: createJSONStorage(() => localStorage), 
      partialize: (state) => ({ successLogin: state.successLogin }),
    }
  )
);
