<template>
  <a-modal
    :title="title"
    :visible="visible"
    :confirm-loading="loading"
    okText="Create"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <label>
      Name
      <a-input v-model="name"></a-input>
    </label>
  </a-modal>
</template>
<script>
import api from "@/services/nodes";
import { notificationTypes } from "@/constants";

export default {
  name: "CreateNodeModal",
  data() {
    return {
      loading: false,
      name: "",
    };
  },
  props: {
    parent: {
      type: Object,
      default: () => {
        return undefined;
      },
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    level() {
      if (this.parent === undefined) return 0;
      else return this.parent.level + 1;
    },
    title() {
      if (this.parent === undefined) return "New root node";
      else return "New child node";
    },
  },
  methods: {
    handleCancel() {
      this.$emit("close", {});
    },
    handleOk() {
      this.loading = true;
      let params = {
        name: this.name,
        level: this.level,
      };
      if (this.parent !== undefined) params["parent"] = this.parent.id;
      api
        .create(params)
        .then((res) => {
          this.createNotification({
            type: notificationTypes.SUCCESS,
            message: `Node ${res.data.name} created succesfully`,
          });
          this.$emit("saved", {});
        })
        .catch((error) => {
          this.handleCommonErrors(error);
          this.loading = false;
        });
      //  this.$emit("close", {});
    },
  },
};
</script>
<style lang="scss" scoped>
</style>