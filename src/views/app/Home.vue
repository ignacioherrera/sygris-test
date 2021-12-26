<template>
  <div class="container">
    <div class="list-header">
      <create-node-modal
        :visible="visibleCreate"
        @close="cancelCreate"
        @saved="savedNode"
      ></create-node-modal>
      <h1>Nodes</h1>
      <div>
        <a-button
          type="primary"
          @click="
            () => {
              toggleAllLists(false);
            }
          "
          class="home-function close-lists"
          >Close All</a-button
        >
        <a-button
          type="primary"
          @click="
            () => {
              toggleAllLists(true);
            }
          "
          class="home-function open-lists"
          >Open All</a-button
        >
        <a-button type="primary" @click="createRootNode" class="home-function"
          ><a-icon type="plus-circle" /> Add Node</a-button
        >
      </div>
    </div>
    <div class="list-body">
      <node
        v-for="item in rootNodes"
        :node="item"
        :key="'node' + item.id"
      ></node>
    </div>
  </div>
</template>
<script>
import CreateNodeModal from "@/components/nodes/CreateNodeModal.vue";
import { mapActions, mapState } from "vuex";
import Node from "@/components/nodes/Node.vue";
export default {
  components: { CreateNodeModal, Node },
  name: "Home",
  data() {
    return {
      loading: false,
      visibleCreate: false,
    };
  },
  mounted() {
    this.loadNodes();
  },
  computed: {
    ...mapState("nodes", ["nodes"]),
    rootNodes() {
      return this.nodes.filter((item) => item.level === 0);
    },
  },
  methods: {
    ...mapActions("nodes", ["getNodeList"]),
    cancelCreate() {
      this.parent = undefined;
      this.visibleCreate = false;
    },
    createRootNode() {
      this.visibleCreate = true;
    },
    savedNode() {
      this.loadNodes();
      this.cancelCreate();
    },
    toggleAllLists(open) {
      this.$bus.$emit("toggle-lists", open);
    },
    loadNodes() {
      this.loading = true;
      this.getNodeList()
        .then(() => {
          this.loading = false;
        })
        .catch((error) => {
          this.handleCommonErrors(error);
          this.loading = false;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  padding: 10px;
}
.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.home-function {
  margin-left: 5px;
}
</style>