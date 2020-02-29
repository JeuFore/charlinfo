import { httpRequest, httpFileRequest } from './httpRequest'

export default {
    get: async function (store, id) {
        await httpRequest(`/file${id}/get`, 'get', store);
        return store
    },
    add: async function (store, id, params, file) {
        await httpFileRequest(`/file${id}`, 'post', store, params, file);
        return store
    },
    delete: async function (store, id, params) {
        await httpRequest(`/file${id}/delete`, 'post', store, params);
        return store
    }
}