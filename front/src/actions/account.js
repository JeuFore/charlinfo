import { httpRequest } from './httpRequest'

export default {
    login: function (store, params) {
        return httpRequest('/account/login', 'post', store, params);
    },
    signup: function (store, params) {
        return httpRequest('/account/signup', 'post', store, params);
    },
    token: function (user) {
        localStorage.setItem('eK#*iZ#Am5nqfo@Xk36&2', user);
    }
}