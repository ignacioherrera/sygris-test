<template>
  <div class="login-page">
    <div class="login-container">
      <h1 class="login-title">Sign In</h1>
      <form v-on:submit.prevent="onSubmit">
        <label>
          Username
          <a-input type="text" class="mb-general" required v-model="username" />
        </label>
        <label>
          Password
          <a-input
            type="password"
            class="mb-general"
            required
            v-model="password"
          />
        </label>
        <label>
          Confirm Password
          <a-input type="password" required v-model="confirmPassword" />
        </label>
        <div class="register-text mb-general">
          <router-link class="register-link" :to="{ name: loginPath }"
            >Back to Login.</router-link
          >
        </div>
        <a-button
          type="primary"
          html-type="submit"
          class="my-button my-button-primary"
          :disabled="disabledSubmit"
          :loading="loading"
        >
          Sign In
        </a-button>
      </form>
    </div>
  </div>
</template>
<script>
import auth from "@/services/auth";
import { notificationTypes, appRoutes } from "@/constants";

export default {
  name: "Register",
  data: () => {
    return {
      username: "",
      password: "",
      confirmPassword: "",
      loading: false,
      loginPath: appRoutes.LOGIN_PATH,
    };
  },
  computed: {
    disabledSubmit() {
      return (
        this.username === "" ||
        this.password === "" ||
        this.password !== this.confirmPassword
      );
    },
  },
  methods: {
    onSubmit() {
      this.loading = true;
      auth
        .registerUser({
          loginname: this.username,
          password: this.password,
        })
        .then(() => {
          this.createNotification({
            type: notificationTypes.SUCCESS,
            message: "Account Created",
          });
          this.loading = false;
          this.$router.push({ name: appRoutes.LOGIN_PATH });
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
.login-page {
  display: flex;
  height: 100vh;
  width: 100%;
  align-items: center;
  background-color: #e3dbd7;
  justify-content: center;
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
.mb-general {
  margin-bottom: 20px;
}
.register-text {
  text-align: right;
}
</style>