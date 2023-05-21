import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/",
        name: "Home",
        component: () => import("pages/Home/Index.vue"),
        meta: {
          general: true,
        },
      },
      {
        path: "/register",
        name: "Register",
        component: () => import("pages/Auth/Register.vue"),
        meta: {
          authRoute: true,
        },
      },
      {
        path: "/login",
        name: "Login",
        component: () => import("pages/Auth/Login.vue"),
        meta: {
          authRoute: true,
        },
      },
      {
        path: "/profile",
        name: "Profile",
        component: () => import("pages/Profile/Index.vue"),
      },
      {
        path: "/profile/edit",
        name: "EditProfile",
        component: () => import("pages/Profile/EditProfile.vue"),
      },
      {
        path: "/articles",
        name: "Articles",
        component: () => import("pages/Articles/Index.vue"),
        meta: {
          general: true,
        },
      },
      {
        path: "/articles/:slug",
        name: "SlugArticle",
        component: () => import("pages/Articles/SlugArticle.vue"),
        meta: {
          general: true,
        },
      },
      {
        path: "/cteate-article",
        name: "CreateArticle",
        component: () => import("pages/Articles/Create.vue"),
      },
    ],
  },

  {
    path: "/:catchAll(.*)*",
    name: "404",
    component: () => import("pages/Error/ErrorNotFound.vue"),
  },
  {
    path: "/403",
    name: "403",
    component: () => import("pages/Error/ErrorForbidden.vue"),
  },
  {
    path: "/500",
    name: "500",
    component: () => import("pages/Error/ErrorInternalServer.vue"),
  },
];

export default routes;
