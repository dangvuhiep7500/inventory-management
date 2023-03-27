import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
// import { Modal } from "antd";
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
    await new Promise((resolve) => setTimeout(resolve, 150));
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const accessToken = Cookies.get("accessToken");
      // const refreshToken = store?.getState()?.user?.refreshToken
      console.log(accessToken);
      console.log(store?.getState()?.auth?.refreshToken);
      // Try to refresh the token
      try {
        const { data } = await axios.post(
          "https://localhost:5000/api/Account/refresh-token",
          { refreshToken: store?.getState()?.auth.refreshToken, accessToken }
        );
        console.log(data.refreshToken);
        const token = data.accessToken;
        Cookies.set("accessToken", token);
        store.dispatch(setRefreshToken(data.refreshToken));
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axios(originalRequest);
      } catch (error) {
        // Modal.error({
        //   title: "Phiên đăng nhập của bạn đã hết hạn",
        //   content: "Vui lòng đăng nhập lại.",
        //   onOk: () => {
        //     localStorage.removeItem("persist:user");
        //     localStorage.clear();
        //     Cookies.remove("accessToken");
        //     Cookies.remove("refreshToken");
        //     window.location.href = "/";
        //   },
        // });
        alert("Phiên đăng nhập của bạn đã hết hạn.Vui lòng đăng nhập lại.");
        localStorage.removeItem("persist:user");
        localStorage.clear();
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        window.location.href = "/";
        }
    }
    return Promise.reject(error);
  }
);
export default instance;
