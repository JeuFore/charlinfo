import { httpRequest, httpFileRequest } from './httpRequest'

export default {
    get: function (store, id) {
        return httpRequest(`/file${id}/get`, 'get', store);
    },
    add: function (store, id, params, file) {
        return httpFileRequest(`/file${id}`, 'post', store, params, file);
    },
    delete: function (store, id, params) {
        return httpRequest(`/file${id}/delete`, 'post', store, params);
    },
    getTitle: function (store, id) {
        return httpRequest(`/file${id}/getTitle`, 'get', store);
    }
}