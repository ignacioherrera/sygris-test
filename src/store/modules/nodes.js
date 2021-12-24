import api from "@/services/nodes";
const LIST_NODES = "LIST_NODES";

const state = {
  nodes: [],
};
const mutations = {
  LIST_NODES(state, nodes) {
    state.nodes = nodes;
  },
};
const actions = {
  getNodeList: ({ commit }) => {
    return new Promise((resolve, reject) => {
      api
        .list()
        .then((res) => {
          commit(LIST_NODES, res.data);
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
