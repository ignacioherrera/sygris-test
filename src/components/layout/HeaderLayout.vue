<template>
  <nav class="header-layout">
    <span class="header-username">Welcome {{ loginName }}</span
    ><button class="my-button my-button-primary" @click="logout">Logout</button>
  </nav>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "HeaderLayout",
  computed: {
    ...mapState("auth", ["loginName"]),
  },
  methods: {
    ...mapActions("auth", ["logout"]),
  },
};
</script>
<style lang="scss" scoped>
@import "@/scss/variables.scss";
.header-layout {
  padding: 10px;
  background-color: $backgroundPrimaryColor;
  box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
  text-align: right;
  position: fixed;
  width: 100%;
  box-sizing: border-box;
  top: 0;
}
.header-username {
  font-size: 18px;
}
</style>