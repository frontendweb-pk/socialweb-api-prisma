export const authRoutes = {
  path: "/auth",
  name: "auth",
  alias: "/login",
  component: () => import("@/pages/auth/auth.vue"),
  meta: { requiresAuth: false },
  children: [
    {
      path: "",
      name: "login",
      alias: ["login"],
      component: () => import("@/pages/auth/login/login.vue"),
    },
    {
      path: "signup",
      name: "signup",
      component: () => import("@/pages/auth/register/register-page.vue"),
    },
    {
      path: "forgot-password",
      name: "forgot-password",
      component: () =>
        import("@/pages/auth/forgot-password/forgot-password-page.vue"),
    },
  ],
};
