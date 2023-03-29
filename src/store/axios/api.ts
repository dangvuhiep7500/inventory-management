import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { useAuthStore } from "../auth/auth";
interface MyAxiosInstance extends AxiosInstance {
  setToken: (token: string) => void;
}

const instance = axios.create({
  baseURL: "https://localhost:5000",
  timeout: 300000,
  headers: {
    "Content-Type": "application/json",
  },
}) as MyAxiosInstance;
instance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // await new Promise((resolve) => setTimeout(resolve, 1500));
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // const refreshToken = useAuthStore.getState().refreshToken
      // console.log(refreshToken1);
      const accessToken = Cookies.get("accessToken");
      const refreshToken = Cookies.get("refreshToken");
      console.log(refreshToken);
      try {
        const { data } = await axios.post(
          "https://localhost:5000/auth/refresh-token",
          { refreshToken: refreshToken, accessToken },
        );
        // console.log(data.refreshToken);
        const token = data.accessToken;
        Cookies.set("accessToken", token);
        Cookies.set("refreshToken", data.refreshToken);
        // useAuthStore.getState().setRefreshToken(data.refreshToken);
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axios(originalRequest);
      } catch (error) {
        alert("Phiên đăng nhập của bạn đã hết hạn.Vui lòng đăng nhập lại.");
        localStorage.removeItem("persist:user");
        localStorage.clear();
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        window.location.href = "/auth/signin";
        }
    }
    return Promise.reject(error);
  }
);
export default instance;
