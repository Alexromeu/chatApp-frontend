import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://192.168.1.70:3000", 
  withCredentials: true
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
