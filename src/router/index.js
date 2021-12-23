import Vue from "vue";
import VueRouter from "vue-router";
import { appRoutes } from "@/constants";
import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";

Vue.use(VueRouter);

const routes = [
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

export default router;
