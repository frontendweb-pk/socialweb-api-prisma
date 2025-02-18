import axiosInstance from "@/axios-instance";
import type { AxiosRequestConfig } from "axios";
import axios from "axios";
import { toast } from "vue3-toastify";

// Define a type for the HTTP options, including data for POST/PUT requests
interface HttpOptions<T> extends AxiosRequestConfig {
  data?: T; // Allow any data for POST, PUT, etc.
}
export const http = async <T>(
  segment: string,
  { method = "get", ...options }: HttpOptions<T>
): Promise<T | undefined> => {
  try {
    const response = await axiosInstance.request<T>({
      url: segment,
      method: method,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Check if it's an Axios error
      console.error("Axios Error:", error.response?.status, error.message);
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred."; // Get message from response or default
      toast.error(errorMessage); // Toast the error message
    } else {
      console.error("Other Error:", error);
      toast.error("An unexpected error occurred.");
    }
    return undefined;
  }
};
