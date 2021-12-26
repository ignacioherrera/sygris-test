<template>
  <div class="login-page">
    <div class="login-container">
      <h1 class="login-title">Sign In</h1>
      <form v-on:submit.prevent="onSubmit">
        <label>
          Username
          <input type="text" required class="login-input" v-model="username" />
        </label>
        <label>
          Password
          <input
            type="password"
            required
            class="login-input"
            v-model="password"
          />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            required
            class="login-input"
            v-model="confirmPassword"
          />
        </label>
        <div class="register-text">
          <router-link class="register-link" :to="{ name: loginPath }"
            >Back to Login.</router-link
          >
        </div>

        <button
          type="submit"
          class="my-button my-button-primary"
          :class="{
            'my-button-disabled': disabledSubmit,
          }"
        >
          Sing In{{ loading ? " ..." : "" }}
        </button>
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
        .then((res) => {
          console.log(res);
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
.login-input {
  width: 100%;
  padding: 10px 5px;
  box-sizing: border-box;
  border-radius: 10px;
  border-width: 1px;
  margin-top: 5px;
  margin-bottom: 20px;
}
.register-text {
  text-align: right;
}
</style>