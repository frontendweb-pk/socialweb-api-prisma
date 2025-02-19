import axios from "axios";
import { useAuthStore } from "./store/auth";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  if (authStore.state.access_token) {
    config.headers.Authorization = `Bearer ${authStore.state.access_token}`;
  }
  return config;
});

// You can add interceptors, response handlers, etc., if needed
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(
        "Response Error:",
        error.response.status,
        error.response.data,
      );

      // Example: Handle specific error codes
      if (error.response.status === 401) {
        const authStore = useAuthStore();
        authStore.logout(); // Or try to refresh the token
        // Optionally redirect the user or display a message
      } else if (error.response.status === 403) {
        // Handle forbidden access
      } else if (error.response.status === 404) {
        // Handle not found
      }
      // ... handle other error codes
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.error("Request Error:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Setup Error:", error.message);
    }

    return Promise.reject(error); // Re-reject the error so the caller can handle it
  },
);

export default axiosInstance;
