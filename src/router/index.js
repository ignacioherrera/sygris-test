import Vue from "vue";
import VueRouter from "vue-router";
import { appRoutes } from "@/constants";
import store from "@/store";
import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: appRoutes.HOME_PATH,
    component: Register,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/signup",
    name: appRoutes.REGISTER_PATH,
    component: Register,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/login",
    name: appRoutes.LOGIN_PATH,
    component: Login,
    meta: {
      requiresAuth: false,
    },
  },
];

const router = new VueRouter({
  routes,
});
router.beforeEach((to, from, next) => {
  console.log({ to });
  console.log(to.meta.requiresAuth);
  if (!to.meta.requiresAuth) next();
  else {
    console.log(store.getters["auth/isLoggedIn"]);
    if (store.getters["auth/isLoggedIn"]) next();
    else {
      next({ name: appRoutes.LOGIN_PATH });
    }
  }
});
export default router;
