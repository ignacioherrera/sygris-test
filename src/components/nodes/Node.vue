<template>
  <div class="node-container">
    <create-node-modal
      :visible="visibleCreate"
      :parent="node"
      @close="cancelCreate"
      @saved="savedNode"
    ></create-node-modal>
    <div class="node-header">
      <div class="title">
        {{ node.name }}
      </div>
      <div class="header-functions">
        <a-button
          @click="createChildren"
          size="small"
          title="Add child"
          type="primary"
          v-if="childrens.length === 0"
          shape="circle"
        >
          <a-icon type="plus" />
        </a-button>
        <a-button
          @click="toggleOpen"
          size="small"
          type="link"
          id="collapse-btn"
          v-if="childrens.length > 0"
          shape="circle"
        >
          <a-icon :type="open ? 'down' : 'right'" />
        </a-button>
      </div>
    </div>
    <a-spin :spinning="loadingChilds">
      <div
        class="childrens-container"
        :class="{ 'childrens-container-open': open }"
        :style="{ paddingLeft: indent }"
      >
        <node
          v-for="item in childrens"
          :node="item"
          :key="'node' + item.id"
        ></node>
        <a-button
          @click="createChildren"
          size="small"
          class="list-create-btn"
          title="Add child"
          type="default"
          v-if="childrens.length !== 0"
        >
          <a-icon type="plus" /> Create another child
        </a-button>
      </div>
    </a-spin>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { notificationTypes } from "@/constants";
import CreateNodeModal from "./CreateNodeModal.vue";

export default {
  components: { CreateNodeModal },
  name: "Node",
  data() {
    return {
      open: false,
      visibleCreate: false,
      loadingChilds: false,
    };
  },
  props: {
    node: Object,
  },
  mounted() {
    this.open = this.openNodes[this.node.id];
  },
  computed: {
    ...mapState("nodes", ["nodes", "openNodes"]),
    indent() {
      return 8 * (this.node.level + 1) + "px";
    },
    collapseHeight() {
      return this.open ? "100%" : "0";
    },
    childrens() {
      return this.nodes.filter((item) => item.parent === this.node.id);
    },
  },
  methods: {
    ...mapActions("nodes", ["toggleNode", "getNodeList"]),
    toggleOpen() {
      this.open = !this.open;
      this.toggleNode({ id: this.node.id, value: this.open });
    },
    createChildren() {
      this.visibleCreate = true;
    },
    cancelCreate() {
      this.visibleCreate = false;
    },
    savedNode() {
      this.loadingChilds = true;
      this.getNodeList()
        .then((res) => {
          console.log(res);
          this.loadingChilds = false;
          this.visibleCreate = false;
        })
        .catch((error) => {
          console.log(error);
          this.createNotification({
            type: notificationTypes.ERROR,
            message: "Loading the node list",
          });
          this.loadingChilds = false;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.node-header {
  border-bottom: solid 1px #e9e9e9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  padding: 2px 0;
}
.childrens-container {
  overflow: hidden;
  height: 0;
}
.childrens-container-open {
  height: 100%;
}
.list-create-btn {
  margin-top: 5px;
}
</style>