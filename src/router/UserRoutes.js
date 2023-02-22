const UserRoutes = [
  {
    path: "/pages/users",
    name: "User",
    component: () => import("@/layouts/UsersLayout.vue"),
    meta: {
      requireAuth: true,
    },
    redirect: "/",
    children: [
      {
        path: "/pages/users/home",
        name: "user-home",
        component: () => import("@/views/users/other/ProfileIndex.vue"),
      },
      {
        path: "/pages/users/profile",
        name: "user-profile",
        component: () => import("@/views/users/other/ProfileIndex.vue"),
      },
      {
        path: "/pages/users/studi/paket",
        name: "studi-paket",
        component: () => import("@/views/users/ujian_studi/PaketIndex.vue"),
      },
    ],
  }
];
export default UserRoutes;

