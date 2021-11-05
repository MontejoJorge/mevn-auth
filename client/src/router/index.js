import { createRouter, createWebHistory } from 'vue-router';
import { getToken } from '../utils/auth';
import Home from '../views/Home.vue';
import store from '@/store';

const routes = [
   {
      path: '/',
      name: 'Home',
      component: Home,
   },
   {
      path: '/about',
      name: 'About',
      component: () => import('../views/About.vue'),
   },
   {
      path: '/login',
      name: 'Login',
      component: () => import('../views/auth/Login.vue'),
   },
];

const router = createRouter({
   history: createWebHistory(process.env.BASE_URL),
   routes,
});

router.beforeEach(async (to, from, next) => {
   const hasToken = getToken();

   if (hasToken) {
      if (to.path === '/login') {
         next({ path: '/' });
      } else {
         const hasRoles = store.getters.roles;

         if (hasRoles.length > 0) {
            next();
         } else {
            const { roles, username } = await store.dispatch('auth/getInfo');
            console.log('roles', roles);
            console.log('username', username);
            next();
         }
      }

   } else {
      next();
   }
});

export default router;
