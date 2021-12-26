import axios from "axios";
import store from "@/store";
import { apiEndpoints, SERVER_URL } from "@/constants";

/* Globally */
const api = axios.create({
  baseURL: SERVER_URL,
  headers: {
    Accept: "application/json",
  },
});

/** Axios interceptor to add JWT Token */
api.interceptors.request.use(
  (config) => {
    if (
      config.url === apiEndpoints.AUTH_SIGNIN_PATH ||
      config.url === apiEndpoints.AUTH_LOGIN_PATH
    ) {
      return config;
    } else {
      const token = store.getters["auth/getToken"];
      if (token !== null) {
        config.headers["Authorization"] = token;
      }
      return config;
    }
  },
  (err) => {
    return Promise.reject(err);
  }
);

/** Intercept response to check unauthorize token and logout */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error.response;
    if (status === 401 || status === 403) {
      store.dispatch("auth/logout");
    }
    return Promise.reject(error);
  }
);

export default api;
