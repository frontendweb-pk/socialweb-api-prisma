export const publicRoutes = {
  path: "/",
  name: "home",
  component: () =>
    import(/* webpackChunkName: "home" */ "@/pages/home/home.vue"),
};
