import axios from 'axios';

const api = axios.create({
   // baseURL: `${window.location.origin}/api`,
   baseURL: `http://localhost:3000/api`,
});

export default api;