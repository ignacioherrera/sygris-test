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
        <span class="title-span" v-if="!editVisible" @click="showEdit">{{
          node.name
        }}</span>
        <div
          class="edit-container"
          :style="!editVisible ? { display: 'none' } : {}"
        >
          <a-input required v-model="name"></a-input>
          <a-button
            size="small"
            type="primary"
            class="edit-actions"
            icon="save"
            @click="SaveEdit"
            :disabled="disableEditSubmit"
            shape="circle"
          ></a-button>
          <a-button
            size="small"
            type="danger"
            class="edit-actions"
            @click="closeEdit"
            icon="close"
            shape="circle"
          ></a-button>
        </div>
      </div>
      <div class="header-functions">
        <a-button
          @click="deleteNode"
          size="small"
          type="link"
          icon="delete"
          class="collapse-btn"
          v-if="childrens.length === 0"
          shape="circle"
        >
        </a-button>
        <a-button
          @click="createChildren"
          size="small"
          title="Add child"
          type="link"
          icon="plus"
          v-if="childrens.length === 0"
          shape="circle"
        >
        </a-button>
        <a-button
          @click="copyList"
          size="small"
          type="link"
          icon="copy"
          class="collapse-btn"
          v-if="childrens.length > 0"
          shape="circle"
        >
        </a-button>
        <a-button
          @click="toggleOpen"
          size="small"
          type="link"
          class="collapse-btn"
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
          <a-icon type="plus" /> Add another child to {{ node.name }}
        </a-button>
      </div>
    </a-spin>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import CreateNodeModal from "./CreateNodeModal.vue";
import { notificationTypes } from "@/constants";
import api from "@/services/nodes";

export default {
  components: { CreateNodeModal },
  name: "Node",
  data() {
    return {
      open: false,
      visibleCreate: false,
      loadingChilds: false,
      editVisible: false,
      name: "",
      deleting: true,
    };
  },
  props: {
    node: Object,
  },
  mounted() {
    this.$bus.$on("toggle-lists", this.generalOpen);
    this.name = this.node.name;
    this.open =
      this.openNodes[this.node.id] === undefined
        ? false
        : this.openNodes[this.node.id];
  },
  computed: {
    ...mapState("nodes", ["nodes", "openNodes"]),
    indent() {
      return 8 * (this.node.level + 1) + "px";
    },
    disableEditSubmit() {
      const regexp = /.*([A-Z]|[a-z]|[1-9])+.*/;
      return (
        this.name === "" ||
        this.name === this.node.name ||
        !regexp.test(this.name)
      );
    },
    collapseHeight() {
      return this.open ? "100%" : "0";
    },
    childrens() {
      return this.nodes.filter((item) => item.parent === this.node.id);
    },
  },
  methods: {
    ...mapActions("nodes", ["toggleNode", "getNodeList", "editNode"]),
    toggleOpen() {
      this.open = !this.open;
      this.toggleNode({ id: this.node.id, value: this.open });
    },
    generalOpen(open) {
      if (this.childrens.length > 0) {
        this.open = open;
        this.toggleNode({ id: this.node.id, value: this.open });
      }
    },
    showEdit() {
      this.editVisible = true;
    },
    closeEdit() {
      this.name = this.node.name;
      this.editVisible = false;
    },
    createChildren() {
      this.visibleCreate = true;
    },
    cancelCreate() {
      this.visibleCreate = false;
    },
    SaveEdit() {
      let newNode = Object.assign(this.node);
      newNode.name = this.name;
      this.editNode(newNode)
        .then((res) => {
          this.createNotification({
            type: notificationTypes.success,
            message: `Node name chaged to ${res.name}`,
          });
          this.editVisible = false;
        })
        .catch((error) => {
          console.log(error);
          this.handleCommonErrors(error);
        });
    },
    savedNode() {
      this.loadingChilds = true;
      this.getNodeList()
        .then(() => {
          this.loadingChilds = false;
          this.visibleCreate = false;
        })
        .catch(() => {
          this.createNotification({
            type: notificationTypes.ERROR,
            message: "Loading the node list",
          });
          this.loadingChilds = false;
        });
    },
    deleteNode() {
      const thisNode = this.node;
      this.$confirm({
        title: "Are you sure delete this task?",
        content: "Some descriptions",
        okText: "Yes",
        okType: "danger",
        confirmLoading: this.deleting,
        cancelText: "No",
        onOk() {
          console.log(thisNode);
          api
            .delete({ id: 'sdbsdbssdbddfbdf' })
            .then(() => {
              this.createNotification({
                type: notificationTypes.SUCCESS,
                message: `Node deleted succesfully`,
              });
              this.$emit("saved", {});
            })
            .catch((error) => {
              console.log(error);
              this.handleCommonErrors(error);
              this.loading = false;
            });
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    },
    copyList() {},
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
.title-span {
  cursor: pointer;
}
.edit-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.edit-actions {
  margin-left: 5px;
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