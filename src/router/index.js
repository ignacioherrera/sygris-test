import Vue from "vue";
import VueRouter from "vue-router";
import { appRoutes } from "@/constants";
import store from "@/store";
import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";
import Home from "@/views/app/Home.vue";
import Layout from "@/components/layout/Layout.vue";

Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    redirect: "/app/",
  },
  {
    path: "/app",
    component: Layout,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "",
        name: appRoutes.HOME_PATH,
        component: Home,
        meta: {
          requiresAuth: true,
        },
      },
    ],
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
  if (!to.meta.requiresAuth) next();
  else {
    if (store.getters["auth/isLoggedIn"]) next();
    else {
      store.dispatch("auth/tryAutoLogin");
      if (store.getters["auth/isLoggedIn"]) next();
      else next({ name: appRoutes.LOGIN_PATH });
    }
  }
});
export default router;
