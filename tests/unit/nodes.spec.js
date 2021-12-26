import { shallowMount, createLocalVue, mount } from "@vue/test-utils";
import Node from "@/components/nodes/Node.vue";
import Vuex from "vuex";
import Vue from "vue";
const localVue = createLocalVue();
const bus = new Vue();
localVue.prototype.$bus = bus;
import { Modal, Button, Input, Icon, Spin } from "ant-design-vue";
localVue.use(Modal);
localVue.use(Button);
localVue.use(Input);
localVue.use(Icon);
localVue.use(Spin);

describe("Node tests", () => {
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
    toggleNode() {},
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

  const nodeWith2Childs = {
    id: "61c65b96795eac001b5e2d85",
    name: "Jany",
    parent: "61c63cf6795eac001b5e2d84",
    created: "2021-12-24T23:45:26.672Z",
    updated: "2021-12-24T23:45:26.672Z",
    level: 1,
  };

  it("node gets all childs", () => {
    const wrapper = shallowMount(Node, {
      propsData: {
        node: nodeWith2Childs,
      },
      store,
      localVue,
    });
    expect(wrapper.vm.childrens.length).toBe(2);
    expect(
      wrapper.vm.childrens.findIndex(
        (item) => item.parent !== wrapper.vm.node.id
      )
    ).toBe(-1);
  });
  it("parent node toggle collapse", async () => {
    const wrapper = mount(Node, {
      propsData: {
        node: nodeWith2Childs,
      },
      store,
      localVue,
    });
    /** Click the toggle button, check open property is true and if the class .childrens-container-open that changes the height is added to the childrens container */
    await wrapper.findComponent(".collapse-btn").trigger("click");
    expect(wrapper.vm.open).toBeTruthy();
    expect(wrapper.find(".childrens-container-open").exists()).toBe(true);
    /** Click the toggle button, check open property is true and if the class .childrens-container-open that changes the height is added to the childrens container */
    await wrapper.findComponent(".collapse-btn").trigger("click");
    expect(wrapper.vm.open).toBeFalsy();
    expect(wrapper.find(".childrens-container-open").exists()).toBe(false);
  });
});
