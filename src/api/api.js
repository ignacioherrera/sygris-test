import axios from "axios";

/* Globally */
const api = axios.create({
  baseURL: "http://20.71.175.9:8001/api/",
  headers: {
    Accept: "application/json",
  },
});

/** Axios interceptor to add JWT Token */
axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default api;
