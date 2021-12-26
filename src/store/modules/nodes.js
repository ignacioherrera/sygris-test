import api from "@/services/nodes";
const LIST_NODES = "LIST_NODES";
const CHANGE_OPEN_NODE = "CHANGE_OPEN_NODE";
const UPDATE_NODE = "UPDATE_NODE";

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
  // Just update the node in the store
  UPDATE_NODE(state, node) {
    node.id = node._id;
    let index = state.nodes.findIndex((item) => item.id === node._id);
    state.nodes[index] = node;
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
  editNode: ({ commit }, node) => {
    return new Promise((resolve, reject) => {
      api
        .update(node)
        .then((res) => {
          commit(UPDATE_NODE, res.data);
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
