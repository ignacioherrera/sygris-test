import api from "@/services/auth";
const LOGIN_USER = "LOGIN_USER";

const state = {
  user: null,
  token: null,
};
const mutations = {
  LOGIN_USER(state, authData) {
    state.user = authData.user;
    state.token = authData.token;
  },
};
const actions = {
  loginUser: ({ commit }, { username, password }) => {
    return new Promise((resolve, reject) => {
      api
        .authUser({
          loginname: username,
          password: password,
        })
        .then((res) => {
          console.log(res);
          commit(LOGIN_USER, {
            user: res.data,
            token: res.data,
          });
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
