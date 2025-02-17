import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import { authRoutes } from "./auth-routes";
import { publicRoutes } from "./public-routes";
import { adminRoutes } from "./admi-routes";

const routes: RouteRecordRaw[] = [publicRoutes, authRoutes, adminRoutes];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
