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
    disconnect: function () {
        localStorage.clear();
        return httpRequest('/user/disconnect', 'post', {});
    },
    permission: function (store, params) {
        return httpRequest('/user/permission', 'post', store, params);
    },
    isConnected: function () {
        let value = {};
        value.user = localStorage.getItem('eK#*iZ#Am5nqfo@Xk36&2');
        value.password = localStorage.getItem('ZkuW8nAwQZ5G%2yHP7&@3');
        return value;
    }
}