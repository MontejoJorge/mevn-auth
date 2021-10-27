import api from '../services/axios';

const login = (username, password) => {
   return new Promise((resolve, reject) => {
      api.post('/auth/login', {
         username,
         password,
      })
         .then(res => {
            const { username, token } = res.data;
            resolve({ username, token });
         })
         .catch(err => {
            reject({ error: err.response.status, msg: err.response.data.msg });
         });
   });
};

const getInfo = token => {
   return new Promise((resolve, reject) => {
      api.post('/auth/info', {
         token,
      })
         .then(res => {
            const { ...data } = res.data;
            resolve(data);
         })
         .catch(err => {
            reject({ error: err.response.status, msg: err.response.data.msg });
         });
   });
};

export const auth = {
   login,
   getInfo,
};
