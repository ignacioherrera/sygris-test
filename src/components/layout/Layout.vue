<template>
  <div>
    <header-layout></header-layout>
    <div class="main-container">
      <router-view></router-view>
    </div>
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
.main-container {
  padding-top: 58px;
}
</style>