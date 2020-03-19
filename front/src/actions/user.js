import { httpRequest } from './httpRequest'

export default {
    get: function (store, user) {
        return httpRequest(`/user/get/${user}`, 'get', store);
    },
    ban: function (store, user) {
        return httpRequest(`/user/ban/${user}`, 'post', store);
    },
    unban: function (store, user) {
        return httpRequest(`/user/unban/${user}`, 'post', store);
    },
    disconnect: async function (store) {
        localStorage.clear();
        httpRequest('/user/disconnect', 'post', store);
        window.location.replace('/connexion');
    },
    permission: function (store, params) {
        return httpRequest('/user/permission', 'post', store, params);
    },
    isConnected: localStorage.getItem('eK#*iZ#Am5nqfo@Xk36&2')
}