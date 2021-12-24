import Vue from "vue";
import Vuex from "vuex";
import auth from "@/store/modules/auth";
import nodes from "@/store/modules/nodes";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    nodes,
  },
});
