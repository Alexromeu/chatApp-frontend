import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://chatapp-backend-1-ne16.onrender.com",
  withCredentials: true,
  timeout: 6000
});

axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
