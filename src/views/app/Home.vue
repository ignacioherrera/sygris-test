<template>
  <div class="container">
    <div class="list-header">
      <h1>List</h1>
      
    </div>
  </div>
</template>
<script>
import api from "@/services/nodes";
import { notificationTypes } from "@/constants";
export default {
  name: "Home",
  data() {
    return {
      nodeList: [],
      loading: false,
    };
  },
  mounted() {
    this.loadNodes();
  },
  methods: {
    loadNodes() {
      this.loading = true;
      api
        .list()
        .then((res) => {
          console.log(res);
          this.loading = true;
        })
        .catch((error) => {
          console.log(error);
          this.createNotification({
            type: notificationTypes.ERROR,
            //message: error.response.data.innerException,
          });
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
</style>