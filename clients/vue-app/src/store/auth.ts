import axiosInstance from "@/axios-instance";
import type { IUser } from "@/lib/types";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useLocalStorage } from "@vueuse/core";

interface Auth {
  isAuth: boolean;
  user: IUser | null | string;
  access_token: string | null;
  role?: string;
}

export const useAuthStore = defineStore("auth", () => {
  const state = ref(
    useLocalStorage<Auth>(
      "auth",
      {
        access_token: null,
        isAuth: false,
        user: null,
        role: "",
      },
      {
        serializer: {
          read: (value) => JSON.parse(value),
          write: (value) => JSON.stringify(value),
        },
      }
    )
  );

  const router = useRouter();

  const signIn = async (body: { email: string; password: string }) => {
    try {
      const response = await axiosInstance.post("/api/auth", body);
      state.value.access_token = response.data.access_token;
      state.value.isAuth = true;
      state.value.user = response.data;
      state.value.role = response.data.role.role_name;

      if (state.value.role === "admin") {
        router.push("/admin/dashboard");
      }

      if (state.value.role === "user") {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const signUp = async (email: string, password: string) => {};

  const logout = async () => {};

  return { state, signIn, signUp, logout };
});
