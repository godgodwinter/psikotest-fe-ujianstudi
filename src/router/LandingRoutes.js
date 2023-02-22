const LandingRoutes = [
  {
    path: "/landing",
    name: "Landing",
    component: () => import("@/layouts/LandingLayout.vue"),
    redirect: "/",
    children: [
      {
        path: "/",
        name: "Login",
        component: () => import("@/views/landing/LandingHome.vue"),
      },
      {
        path: "/login",
        name: "landing-login",
        component: () => import("@/views/landing/LandingHome.vue"),
      },
      {
        path: "/home",
        name: "landing-home",
        component: () => import("@/views/landing/LandingHome.vue"),
      },
      {
        path: "/404",
        name: "404",
        component: () => import("@/views/landing/404.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404",
  },
];
export default LandingRoutes;
