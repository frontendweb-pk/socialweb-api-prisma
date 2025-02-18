import axiosInstance from "@/axios-instance";
import type { IUser } from "@/lib/types";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useLocalStorage } from "@vueuse/core";
import { jwtDecode } from "jwt-decode";
import { toast } from "vue3-toastify";

interface Auth {
  isAuth: boolean;
  user: IUser | null | string;
  access_token: string | null;
  role?: string;
  expireAt?: number | null; // Store expiry as timestamp
}

let timer: ReturnType<typeof setTimeout>;
export const useAuthStore = defineStore("auth", () => {
  const state = ref(
    useLocalStorage<Auth>(
      "auth",
      {
        access_token: null,
        isAuth: false,
        user: null,
        role: "",
        expireAt: 0,
      },
      {
        serializer: {
          read: (value) => JSON.parse(value),
          write: (value) => JSON.stringify(value),
        },
      }
    )
  );

  // extract data from store
  const isLoggedIn = !!state.value.access_token;
  const loggedInUser = state.value.user;
  const loggedInRole = state.value.role;
  const expireAt = state.value.expireAt;

  // router
  const router = useRouter();

  // auto logout
  const autoLogout = (time: number) => {
    timer = setTimeout(() => {
      logout();
    }, time);
  };

  // Decode JWT token to extract payload
  const decodeToken = (token: string) => {
    try {
      return jwtDecode(token);
    } catch (error) {
      toast.error((error as Error).message);
      return null;
    }
  };

  // Check if token is expired and logout if necessary
  const checkAuth = () => {
    if (isLoggedIn) {
      if (expireAt && expireAt < Date.now()) {
        logout();
      }
    } else {
      logout();
    }
  };

  const signIn = async (body: { email: string; password: string }) => {
    try {
      const response = await axiosInstance.post("/api/auth", body);
      const { access_token, role, ...user } = response.data;

      // Save user data and token in the store
      state.value = {
        access_token,
        isAuth: true,
        user,
        role: role.role_name,
      };

      // Decode the token and setup auto logout
      const decoded = decodeToken(access_token);
      if (decoded?.exp) {
        state.value.expireAt = decoded.exp;
        autoLogout(decoded.exp);
      }

      // Navigate user based on role
      navigateBasedOnRole(state.value.role);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  // logout
  const logout = async () => {
    if (timer) clearTimeout(timer);
    state.value = {
      isAuth: false,
      user: null,
      access_token: null,
      role: "",
    };
    router.push("/login");
  };

  // Navigate user based on their role
  const navigateBasedOnRole = (role: string | undefined) => {
    switch (role) {
      case "superadmin":
      case "admin":
        router.push("/admin/dashboard");
        break;
      case "user":
        router.push("/");
        break;
      default:
        router.push("/login");
        break;
    }
  };

  const signUp = async (email: string, password: string) => {};

  return {
    isLoggedIn,
    loggedInRole,
    loggedInUser,
    state,
    signIn,
    signUp,
    logout,
    checkAuth,
  };
});
