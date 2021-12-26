import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Mixins from "@/mixins";
import eventBus from "@/utils/event-bus";
import { notificationTypes, appRoutes } from "@/constants";
/** Notification toasts */
import VueIziToast from "vue-izitoast";
import "izitoast/dist/css/iziToast.min.css";
Vue.use(VueIziToast);

/** Antd components */
import "ant-design-vue/dist/antd.css";
import { Modal, Button, Input, Icon, Spin } from "ant-design-vue";
Vue.use(Modal);
Vue.use(Button);
Vue.use(Input);
Vue.use(Icon);
Vue.use(Spin);

Vue.mixin(Mixins);

// event bus
Vue.prototype.$bus = eventBus;
// common constants
Vue.prototype.$constants = {
  notificationTypes: notificationTypes,
  appRoutes: appRoutes,
};

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
