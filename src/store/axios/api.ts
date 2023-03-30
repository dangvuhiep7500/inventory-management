import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
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
axios.defaults.withCredentials = true;
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
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const accessToken = Cookies.get("accessToken");
      try {
        const { data } = await axios.post(
          "https://localhost:5000/auth/refresh-token",
          { accessToken, withCredentials: true }
        );
        const token = data.accessToken;
        Cookies.set("accessToken", token);
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axios(originalRequest);
      } catch (error: AxiosError | unknown) {
        if (axios.isAxiosError(error)) {
          console.log(error.response?.data?.message || error.message);
        }
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
