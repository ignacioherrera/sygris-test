import api from "@/api/api";
import { apiEndpoints } from "@/constants";
export default {
  loginUser(params) {
    return api.post(apiEndpoints.AUTH_LOGIN_PATH, params);
  },
  registerUser: (params) => api.post(apiEndpoints.AUTH_SIGNIN_PATH, params),
};
