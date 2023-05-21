import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import routes from "./routes";
import { useUser } from "src/composables/useUser";

const createHistory = process.env.SERVER
  ? createMemoryHistory
  : process.env.VUE_ROUTER_MODE === "history"
  ? createWebHistory
  : createWebHashHistory;

const Router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes,

  history: createHistory(process.env.VUE_ROUTER_BASE),
});

Router.beforeEach((to, from, next) => {
  const { checkLS } = useUser();
  if (!to.matched.length) {
    next({ name: "404" });
  } else {
    if (to.meta?.authRoute) {
      if (checkLS()) {
        next({ name: "Home" });
      } else next();
    } else if (to.meta?.general) {
      next();
    } else {
      if (checkLS()) next();
      else next("/login");
    }
  }
});

export default Router;
