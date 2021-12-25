import api from "@/services/nodes";
const LIST_NODES = "LIST_NODES";
const CHANGE_OPEN_NODE = "CHANGE_OPEN_NODE";

const state = {
  nodes: [],
  openNodes: {},
};
const mutations = {
  LIST_NODES(state, nodes) {
    state.nodes = nodes;
    nodes.forEach((element) => {
      if (state.openNodes[element.id] === undefined)
        state.openNodes[element.id] = false;
    });
  },
  CHANGE_OPEN_NODE(state, params) {
    state.openNodes[params.id] = params.value;
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
  toggleNode: ({ commit }, params) => {
    commit(CHANGE_OPEN_NODE, params);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
