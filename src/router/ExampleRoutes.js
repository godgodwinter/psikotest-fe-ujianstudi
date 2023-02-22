const LandingRoutes = [
    {
        path: "/example",
        name: "Example",
        component: () => import("@/layouts/AdminLayout.vue"),
        redirect: "/",
        children: [
            {
                path: "/example/login",
                name: "example-login",
                component: () => import("@/views/landing/LandingHome.vue"),
            },
        ],
    },
];
export default LandingRoutes;
