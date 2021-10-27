import { createStore } from 'vuex';

import auth from "./modules/auth";
import getters from './getters';

export default createStore({
   getters,
   state: {},
   mutations: {},
   actions: {},
   modules: {
      auth
   },
});
