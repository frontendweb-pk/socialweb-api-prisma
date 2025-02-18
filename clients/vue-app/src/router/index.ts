import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import { authRoutes } from "./auth-routes";
import { publicRoutes } from "./public-routes";
import { adminRoutes } from "./admin-routes";
import { useAuthStore } from "@/store";

const routes: RouteRecordRaw[] = [publicRoutes, authRoutes, adminRoutes];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

// router.beforeEach((to, from, next) => {});
// router.afterEach(() => {});

// middleware
router.beforeEach((to, _, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.state.isAuth) {
    next({
      path: `/login`,
      query: { redirectFrom: encodeURIComponent(to.fullPath) },
    });
  } else {
    next();
  }
});

export default router;
