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
      {
        path: "/pages/users/studi/paket/detail/:aspek_detail_id/index/:index",
        name: "studi-paket-detail",
        component: () => import("@/views/users/ujian_studi/PaketDetail.vue"),
      },
      {
        path: "/pages/users/studi/proses/soal/index/:index",
        name: "studi-proses-soal",
        component: () => import("@/views/users/ujian_studi/SoalIndex.vue"),
      },
    ],
  }
];
export default UserRoutes;

