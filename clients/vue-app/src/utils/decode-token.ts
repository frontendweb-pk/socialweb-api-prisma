import { jwtDecode } from "jwt-decode";
import { toast } from "vue3-toastify";

// Decode JWT token to extract payload
export const decodeToken = (token: string) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    toast.error((error as Error).message);
    return null;
  }
};
