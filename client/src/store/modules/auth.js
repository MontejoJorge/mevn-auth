import { auth } from '../services/auth';
import { getToken, setToken, removeToken } from '@/utils/auth';

const authModule = {
   namespaced: true,
   state: {
      token: getToken(),
      username: '',
      roles: [],
   },
   mutations: {
      logout(state) {
         state.token = null;
         state.username = null;
      },
      loginSucces(state, username, token) {
         state.token = token;
         state.username = username;
      },
      setRoles(state, roles) {
         state.roles = roles;
      },
   },
   actions: {
      login({ commit }, { username, password }) {
         auth
            .login(username, password)
            .then(res => {
               const { username, token } = res;
               console.log(username, token);
               setToken(token);
               commit('loginSucces', { username, token });
            })
            .catch(err => {
               const { error, msg } = err;
               console.log(error, msg);
            });
      },
      logout({ commit }) {
         commit('logout');
         removeToken();
      },
      async getInfo({ commit, state }) {
         const info = await auth.getInfo(state.token).then(res => {
            const { roles } = res;
            commit('setRoles', roles);
            return { roles };
         });
         return info;
      },
   },
};

export default authModule;
