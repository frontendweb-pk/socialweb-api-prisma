import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// You can add interceptors, response handlers, etc., if needed
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle error (e.g., show notification)
    return Promise.reject(error);
  }
);

export default axiosInstance;
