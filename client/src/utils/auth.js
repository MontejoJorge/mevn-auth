import Cookies from 'js-cookie';

const TokenKey = 'Token';
const expires = new Date(new Date().getTime() + 28800000); //8h

export function getToken() {
   return Cookies.get(TokenKey);
}

export function setToken(token) {
   return Cookies.set(TokenKey, token, { expires });
}

export function removeToken() {
   return Cookies.remove(TokenKey);
}
