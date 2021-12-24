<template>
  <div class="node-header">
    <button><a-icon type="right" :rotate="rotateOpen" /></button>
    {{ node.name }}
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Node",
  props: {
    node: Object,
    open: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState("nodes", ["nodes"]),
    childrens() {
      return this.nodes.filter((item) => item.parent === this.node.id);
    },
    rotateOpen() {
      return this.open ? 270 : 0;
    },
  },
};
</script>
<style lang="scss" scoped>
</style>