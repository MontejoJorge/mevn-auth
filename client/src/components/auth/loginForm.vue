<template>
   <form action="/api/login" method="post">
      <label for="username">Username: </label>
      <input
         type="text"
         name="username"
         id="username"
         v-model="username"
         placeholder="Username" /><br /><br />
      <label for="password">Password: </label>
      <input
         type="password"
         name="password"
         id="password"
         v-model="password"
         placeholder="Password" /><br /><br />
      <p>{{ errorMsg }}</p>
      <input type="submit" value="Login" @click="doLogin" />
   </form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
   name: 'login-form',
   data() {
      return {
         username: "montejojorge",
         password: "Jm12345$",
         errorMsg: null
      };
   },
   methods: {
      ...mapActions('auth', ['login']),
      doLogin(e) {
         const { username, password } = this;
         this.login({ username, password })
            .then(() => {
               this.$router.push({ path: '/' });
            })
            .catch((err) => {
               this.errorMsg = err.msg;
            });
         e.preventDefault();
      },
   },
};
</script>