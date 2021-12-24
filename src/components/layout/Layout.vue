<template>
  <div>
    <header-layout></header-layout>
    <router-view></router-view>
  </div>
</template>
<script>
import HeaderLayout from "./HeaderLayout.vue";
export default {
  name: "Layout",
  components: { HeaderLayout },
};
</script>
<style lang="scss" scoped>
</style>