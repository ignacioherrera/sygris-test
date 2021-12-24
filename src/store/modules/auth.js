import api from "@/services/auth";
import { setCookie, removeCookie, getCookie } from "@/utils/utils";
import { AUTH_COOKIE, appRoutes } from "@/constants";
import router from "@/router";
const LOGIN_USER = "LOGIN_USER";
const CLEAR_AUTH = "CLEAR_AUTH";

const state = {
  accessToken: null,
  loginName: null,
};
const getters = {
  isLoggedIn: (state) => state.accessToken !== null,
};
const mutations = {
  LOGIN_USER(state, authData) {
    state.loginName = authData.loginName;
    state.accessToken = `Bearer ${authData.accessToken}`;
  },
  CLEAR_AUTH(state) {
    state.loginName = null;
    state.accessToken = null;
  },
};
const actions = {
  setLogoutTimer({ dispatch }, expirationTime) {
    setTimeout(() => {
      dispatch("logout");
    }, expirationTime - new Date().getTime());
  },
  loginUser: ({ commit }, { username, password }) => {
    return new Promise((resolve, reject) => {
      api
        .loginUser({
          loginname: username,
          password: password,
        })
        .then((res) => {
          commit(LOGIN_USER, res.data);
          let expDate = new Date(res.data.expires);
          setCookie(
            AUTH_COOKIE,
            JSON.stringify({
              token: state.accessToken,
              expiration: res.data.expires,
              loginName: state.loginName,
            }),
            expDate
          );
          resolve(res.data.loginName);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  logout({ commit }) {
    commit(CLEAR_AUTH);
    removeCookie(AUTH_COOKIE);
    router.replace({ name: appRoutes.LOGIN_PATH });
  },
  tryAutoLogin({ commit, dispatch }) {
    let authCookie = getCookie(AUTH_COOKIE);
    if (authCookie === null) {
      return;
    }
    const authData = JSON.parse(authCookie);
    commit(LOGIN_USER, authData.expiration);
    dispatch("setLogoutTimer", authData);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
