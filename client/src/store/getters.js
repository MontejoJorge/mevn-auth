const getters = {
   token: state => state.auth.token,
   roles: state => state.auth.roles,
   test: state => state.auth.test
}

export default getters;