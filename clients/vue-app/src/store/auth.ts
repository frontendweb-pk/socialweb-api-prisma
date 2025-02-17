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
  getters: {
    isAuthenticate: (state) => state.isAuth,
    role: (state) => state.user?.role.role_name,
  },

  actions: {
    async signIn(body: { email: string; password: string }) {
      try {
        const response = await axiosInstance.post<IUser>("/api/auth", body);
        const data = response.data;

        // data
        console.log(data);
        this.isAuth = true;
        this.access_token = data.access_token;
        this.user = data;

        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async signUp() {},
  },
});
