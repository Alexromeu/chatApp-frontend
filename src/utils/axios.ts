import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://chatapp-backend-zo7f.onrender.com", 
  withCredentials: true
});

axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
