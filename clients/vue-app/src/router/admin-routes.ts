export const adminRoutes = {
  path: "/admin",
  name: "admin",
  redirect: "/admin/dashboard",
  meta: { requiresAuth: true },
  component: () => import("@/components/layout/admin/AdminLayout.vue"),
  children: [
    {
      path: "dashboard",
      component: () => import("@/pages/admin/dashboard/dashboard.vue"),
    },
    {
      path: "roles",
      name: "roles",
      component: () => import("@/pages/admin/roles/page.vue"),
    },
    {
      path: "permission",
      name: "permission",
      component: () => import("@/pages/admin/permission/permission.vue"),
    },
    {
      path: "users",
      name: "users",
      component: () => import("@/pages/admin/users/users.vue"),
    },
    {
      path: "posts",
      name: "posts",
      component: () => import("@/pages/admin/posts/posts.vue"),
    },

    {
      path: "comments",
      name: "comments",
      component: () => import("@/pages/admin/comments/comments.vue"),
    },
    {
      path: "settings",
      name: "settings",
      component: () => import("@/pages/admin/settings/settings.vue"),
    },
  ],
};
