import api from "@/api/api";

const AUTH_SIGNIN_PATH = "createLogin";
const AUTH_LOGIN_PATH = "login";
export default {
  authUser(params) {
    return api.post(AUTH_LOGIN_PATH, params);
  },
  registerUser: (params) => api.post(AUTH_SIGNIN_PATH, params),
};
