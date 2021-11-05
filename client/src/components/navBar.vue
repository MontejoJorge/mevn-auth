<template>
   <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <div class="container-fluid">
         <router-link to="/" class="navbar-brand">
            <img src="../assets/logo.png" alt="logo" id="navBarLogo" />
            Navbar
         </router-link>
         <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse">
            <span class="navbar-toggler-icon"></span>
         </button>
         <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav">
               <li class="nav-item">
                  <router-link
                     to="/"
                     class="nav-link"
                     active-class="active"
                     exact-active-class="active"
                     >Home</router-link
                  >
               </li>
               <li class="nav-item">
                  <router-link
                     to="/about"
                     class="nav-link"
                     active-class="active"
                     exact-active-class="active"
                     >About</router-link
                  >
               </li>
            </ul>
            <ul class="nav nav-bar ml-auto w-100 justify-content-end">
               <li class="nav-item">
                  <router-link
                     v-if="!token"
                     to="/login"
                     class="nav-link"
                     active-class="active"
                     exact-active-class="active"
                     >Login</router-link
                  >
                  <router-link
                     v-if="token"
                     to="/login"
                     class="nav-link"
                     active-class="active"
                     exact-active-class="active"
                     >{{ username }}</router-link
                  >
               </li>
            </ul>
         </div>
      </div>
   </nav>
</template>

<script>
export default {
   name: 'nav-bar',
   computed: {
      token() {
         return this.$store.state.auth.token;
      },
      username() {
         return this.$store.state.auth.username;
      },
   },
};
</script>

<style>
#navBarLogo {
   max-width: 30px;
}
</style>