export const adminRoutes = {
  path: "/admin",
  name: "admin",
  redirect: "/admin/dashboard",
  component: () => import("@/components/layout/admin/AdminLayout.vue"),
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
};
