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
      SET_TOKEN(state, token) {
         state.token = token;
      },
      logout(state) {
         state.token = null;
         state.username = null;
      },
      SET_ROLES(state, roles) {
         state.roles = roles;
      },
      SET_USERNAME(state, username) {
         state.username = username;
      },
   },
   actions: {
      login({ commit }, { username, password }) {
         return new Promise((resolve, reject) => {
            auth
               .login(username, password)
               .then(res => {
                  const { token } = res;
                  setToken(token);
                  commit("SET_TOKEN", token);
                  resolve();
               })
               .catch(err => {
                  const { error, msg } = err;
                  reject({ error, msg });
               });
         });
      },
      logout({ commit }) {
         commit('logout');
         removeToken();
      },
      async getInfo({ commit, state }) {
         const info = await auth.getInfo(state.token).then(res => {
            const { roles, username } = res;
            commit('SET_ROLES', roles);
            commit('SET_USERNAME', username);
            return { roles };
         });
         return info;
      },
   },
};

export default authModule;
