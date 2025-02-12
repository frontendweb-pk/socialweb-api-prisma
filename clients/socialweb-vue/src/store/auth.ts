import axiosInstance from "@/axios-instance";
import type { IUser } from "@/lib/types";
import { defineStore } from "pinia";

interface Auth {
  isAuth: boolean;
  user: IUser | null;
  access_token: string | null;
}
export const useAuth = defineStore("auth", {
  state: () =>
    ({
      access_token: null,
      user: null,
      isAuth: false,
    } as Auth),
  getters: {},
  actions: {
    async signIn(body: { email: string; password: string }) {
      try {
        const response = await axiosInstance.post("/auth", body);
        const data = await response.data;
        console.log(response, data);
      } catch (error) {
        console.log(error);
      }
    },
    async signUp() {},
  },
});
