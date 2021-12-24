<template>
  <div class="container">
    <h1>List</h1>
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