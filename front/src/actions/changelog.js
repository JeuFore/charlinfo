import { httpRequest } from './httpRequest'

export default {
    get: async function (store) {
        await httpRequest('/changelog/get', 'get', store);
        return store
    },
    add: async function (store, params) {
        await httpRequest('/changelog/add', 'post', store, params);
        return store
    },
    delete: async function (store, id) {
        await httpRequest(`/changelog/delete/${id}`, 'post', store);
        return store
    }
}