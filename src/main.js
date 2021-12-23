import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Mixins from "@/mixins";
/** Notification toasts */
import VueIziToast from "vue-izitoast";
import "izitoast/dist/css/iziToast.min.css";
Vue.use(VueIziToast);

Vue.mixin(Mixins);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
