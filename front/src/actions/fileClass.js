import { httpRequest } from './httpRequest'

export default {
    get: async function (store, id) {
        await httpRequest(`/file${id}/get`, 'get', store);
        return store
    },
    add: async function (store, id, params) {
        await httpRequest(`/file${id}/add`, 'post', store, params);
        return store
    },
    delete: async function (store, id) {
        await httpRequest(`/file${id}/delete`, 'post', store);
        return store
    }
}