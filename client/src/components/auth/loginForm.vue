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

const usernameRegex = new RegExp('^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$');
const passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{6,20}$');

export default {
   name: 'login-form',
   data() {
      return {
         username: null,
         password: null,
         errorMsg: null,
         validFields: false
      };
   },
   methods: {
      ...mapActions('auth', ['login']),
      doLogin(e) {
         e.preventDefault();
         
         this.validFields = this.checkFields();

         if (this.validFields) {
            const { username, password } = this;
            this.login({ username, password })
               .then(() => {
                  this.$router.push({ path: '/' });
               })
               .catch((err) => {
                  this.errorMsg = err.msg;
               });
         } else {
            this.errorMsg = 'Invalid username or password.';
         }
      },
      checkFields() {
         return (
            usernameRegex.test(this.username) &&
            passwordRegex.test(this.password)
         );
      },
   },
};
</script>