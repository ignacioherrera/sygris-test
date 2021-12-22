import axios from "axios";
import Vue from "vue";

/* Globally */
const api = axios.create({
  baseURL: "http://20.71.175.9:8001/",
  headers: {
    Accept: "application/json",
  },
});

Vue.prototype.$http = api;
export default api;
