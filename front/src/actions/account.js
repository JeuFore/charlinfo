import { httpRequest } from './httpRequest'

export default {
    login: async function (store, params) {
        await httpRequest('/account/login', 'post', store, params);
        return store;
    },
    signup: async function (store, params) {
        await httpRequest('/account/signup', 'post', store, params);
        return store;
    },
    token: function (user) {
        localStorage.setItem('eK#*iZ#Am5nqfo@Xk36&2', user);
    }
}