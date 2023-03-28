import { create } from "zustand";
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
  accessToken: string | null;
  successLogin: boolean;
  successRegister: boolean;
  error: string | null;
  login: ({ username, password }: AuthUser) => void;
  register: ({
    lastName,
    firstName,
    email,
    username,
    password,
  }: RegisterUser) => void;
};

export const useAuthStore = create<AuthActions>((set) => ({
  isLoading: false,
  accessToken: null,
  successLogin: false,
  successRegister: false,
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
      set({ accessToken: data.token, successLogin: true, error: null });
      Cookies.set("accessToken", data.token);
    } catch (error: AxiosError | unknown) {
      if (axios.isAxiosError(error)) {
        set({
          accessToken: null,
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
  logout: () => {
    set({ isLoading: false, accessToken: null, error: null });
  },
}));
