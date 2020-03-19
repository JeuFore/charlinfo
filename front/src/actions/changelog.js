import { httpRequest } from './httpRequest'

export default {
    get: function (store) {
        return httpRequest('/changelog/get', 'get', store);
    },
    add: function (store, params) {
        return httpRequest('/changelog/add', 'post', store, params);
    },
    delete: function (store, id) {
        return httpRequest(`/changelog/delete/${id}`, 'post', store);
    }
}