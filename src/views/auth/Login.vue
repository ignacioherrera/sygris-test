<template>
  <div class="login-page">
    <div class="login-container">
      <h1 class="login-title">Login</h1>
      <form v-on:submit.prevent="onSubmit">
        <label>
          Username
          <a-input type="text" required class="mb-general" v-model="username" />
        </label>
        <label>
          Password
          <a-input-password
            type="password"
            required
            class="login-input"
            v-model="password"
          />
        </label>
        <div class="register-text mb-general">
          <router-link class="register-link" :to="{ name: registerPath }"
            >Register new account.</router-link
          >
        </div>

        <a-button
          type="primary"
          html-type="submit"
          class="my-button my-button-primary"
          :disabled="disabledSubmit"
          :loading="loading"
        >
          Login
        </a-button>
      </form>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { notificationTypes, appRoutes } from "@/constants";

export default {
  name: "Login",
  data: () => {
    return {
      username: "",
      password: "",
      loading: false,
      registerPath: appRoutes.REGISTER_PATH,
    };
  },
  computed: {
    disabledSubmit() {
      return this.username === "" || this.password === "";
    },
  },
  methods: {
    ...mapActions("auth", ["loginUser"]),
    onSubmit() {
      this.loading = true;
      this.loginUser({
        username: this.username,
        password: this.password,
      })
        .then((res) => {
          this.createNotification({
            type: notificationTypes.SUCCESS,
            message: `User ${res} logged in succesfully`,
          });
          this.loading = false;
          this.$router.push({ name: appRoutes.HOME_PATH });
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
@import "@/scss/variables.scss";
.login-page {
  display: flex;
  height: 100vh;
  width: 100%;
  align-items: center;
  background-color: $backgroundPrimaryColor;
  justify-content: center;
}
.mb-general {
  margin-bottom: 20px;
}
.login-container {
  padding: 20px 15px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  background-color: #fff;
  border-radius: 10px;
  width: 280px;
}
.login-title {
  margin-top: 0;
  color: #090909;
}
.register-text {
  text-align: right;
  margin-top: 5px;
}
</style>