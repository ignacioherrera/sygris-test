import { shallowMount, createLocalVue, mount } from "@vue/test-utils";
import Node from "@/components/nodes/Node.vue";
import CreateNodeModal from "@/components/nodes/CreateNodeModal.vue";
import Home from "@/views/app/Home.vue";
import Vuex from "vuex";
const localVue = createLocalVue();
import { Modal, Button, Input, Icon, Spin } from "ant-design-vue";
localVue.use(Modal);
localVue.use(Button);
localVue.use(Input);
localVue.use(Icon);
localVue.use(Spin);
localVue.component("node", Node);
localVue.component("create-node-modal", CreateNodeModal);

describe("Home displays nodes correctly", () => {
  /**Store mock */
  const state = {
    nodes: [
      {
        id: "61c63765795eac001b5e2d82",
        name: "Ignacio",
        created: "2021-12-24T21:11:01.711Z",
        updated: "2021-12-24T21:11:01.711Z",
        level: 0,
      },
      {
        id: "61c637dc795eac001b5e2d83",
        name: "Made",
        created: "2021-12-24T21:13:00.747Z",
        updated: "2021-12-24T21:13:00.747Z",
        level: 0,
      },
      {
        id: "61c63cf6795eac001b5e2d84",
        name: "Santy",
        created: "2021-12-24T21:34:46.475Z",
        updated: "2021-12-24T21:34:46.475Z",
        level: 0,
      },
      {
        id: "61c65b96795eac001b5e2d85",
        name: "Jany",
        parent: "61c63cf6795eac001b5e2d84",
        created: "2021-12-24T23:45:26.672Z",
        updated: "2021-12-24T23:45:26.672Z",
        level: 1,
      },
      {
        id: "61c65f54795eac001b5e2d86",
        name: "Aaron",
        parent: "61c63765795eac001b5e2d82",
        created: "2021-12-25T00:01:24.608Z",
        updated: "2021-12-25T00:01:24.608Z",
        level: 1,
      },
      {
        id: "61c6621e795eac001b5e2d87",
        name: "XXX",
        parent: "61c63cf6795eac001b5e2d84",
        created: "2021-12-25T00:13:18.829Z",
        updated: "2021-12-25T00:13:18.829Z",
        level: 1,
      },
      {
        id: "61c6622d795eac001b5e2d88",
        name: "Aaron",
        parent: "61c65b96795eac001b5e2d85",
        created: "2021-12-25T00:13:33.424Z",
        updated: "2021-12-25T00:13:33.424Z",
        level: 2,
      },
      {
        id: "61c6632d795eac001b5e2d89",
        name: "Pepe",
        parent: "61c637dc795eac001b5e2d83",
        created: "2021-12-25T00:17:49.624Z",
        updated: "2021-12-25T00:17:49.624Z",
        level: 1,
      },
      {
        id: "61c75d33795eac001b5e2d8a",
        name: "Pepe",
        parent: "61c65b96795eac001b5e2d85",
        created: "2021-12-25T18:04:35.591Z",
        updated: "2021-12-25T18:04:35.591Z",
        level: 2,
      },
      {
        id: "61c75d46795eac001b5e2d8b",
        name: "Jose",
        parent: "61c6622d795eac001b5e2d88",
        created: "2021-12-25T18:04:54.860Z",
        updated: "2021-12-25T18:04:54.860Z",
        level: 3,
      },
      {
        id: "61c790da795eac001b5e2d8c",
        name: "Extra",
        created: "2021-12-25T21:44:58.725Z",
        updated: "2021-12-25T21:44:58.725Z",
        level: 0,
      },
      {
        id: "61c790f0795eac001b5e2d8d",
        name: "extra child",
        parent: "61c790da795eac001b5e2d8c",
        created: "2021-12-25T21:45:20.126Z",
        updated: "2021-12-25T21:45:20.126Z",
        level: 1,
      },
    ],
    openNodes: {},
  };
  const actions = {
    getNodeList() {
      return new Promise((resolve) => {
        resolve();
      });
    },
  };
  const store = new Vuex.Store({
    modules: {
      nodes: {
        namespaced: true,
        state,
        actions,
      },
    },
  });
  localVue.use(Vuex);

  it("Home display all root nodes", () => {
    const wrapper = shallowMount(Home, {
      store,
      localVue,
    });
    const nodeComponents = wrapper.findAllComponents(Node);
    expect(nodeComponents.length).toBe(4);
    expect(
      nodeComponents.filter((item) => item.vm.node.level !== 0).length
    ).toBe(0);
  });
  /**
Home display root nodes and every node displays its childrens, the next test is to check that the 
number of nodes displayed is equal to the lenght of the list from the api saved in the store state
 */
  it("Home display all nodes", () => {
    const wrapper = mount(Home, {
      store,
      localVue,
    });
    const nodeComponents = wrapper.findAllComponents(Node);
    expect(nodeComponents.length).toBe(12);
  });
});
