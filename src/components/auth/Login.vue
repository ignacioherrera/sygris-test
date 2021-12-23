<template>
  <div class="login-page">
    <div class="login-container">
      <h1 class="login-title">Login</h1>
      <form v-on:submit.prevent="onSubmit">
        <label>
          Username
          <input type="text" class="login-input" v-model="username" />
        </label>
        <label>
          Password
          <input type="password" class="login-input" v-model="password" />
        </label>

        <button type="submit" class="login-submit">
          Login{{ loading ? " ..." : "" }}
        </button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data: () => {
    return {
      username: "",
      password: "",
      loading: false,
    };
  },
  methods: {
    onSubmit: () => {},
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
  width: 300px;
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
.login-submit {
  background-color: #4abdac;
  border: none;
  padding: 10px 20px;
  font-size: 15px;
  color: #fff;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #518a7b;
  }
}
.login-submit-disabled {
  background-color: #dfdce3;
}
</style>