import { httpRequest } from './httpRequest'

export default {
    get: async function (store, user) {
        await httpRequest(`/user/get/${user}`, 'get', store);
        return store
    },
    ban: async function (store, user) {
        await httpRequest(`/user/ban/${user}`, 'post', store);
        return store
    },
    unban: async function (store, user) {
        await httpRequest(`/user/unban/${user}`, 'post', store);
        return store
    },
    disconnect: function () {
        localStorage.clear();
        httpRequest('/user/disconnect/', 'post', {});
        window.location.replace('/home');
    },
    isConnected: localStorage.getItem('eK#*iZ#Am5nqfo@Xk36&2')
}