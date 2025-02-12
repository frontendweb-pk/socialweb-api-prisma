import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "home" */ "@/pages/home/home.vue"),
  },

  {
    path: "/auth",
    children: [
      {
        path: "",
        component: () => import("@/pages/auth/login/login.vue"),
      },
    ],
  },
  {
    path: "/admin",
    redirect: "/admin/dashboard",
    name: "admin",
    children: [
      {
        path: "dashboard",
        component: () => import("@/pages/admin/dashboard/dashboard.vue"),
      },
      {
        path: "role",
        name: "role",
        component: () => import("@/pages/admin/role/role.vue"),
      },
    ],
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
