import { httpRequest } from './httpRequest'

export default {
    login: async function (store, params) {
        await httpRequest('/account/login', 'post', store, params);
        return store
    },
    signup: async function (store) {
        await httpRequest('/account/signup', 'post', store);
        return store
    }
}