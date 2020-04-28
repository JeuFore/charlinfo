import { httpRequest } from './httpRequest'

export default {
    get: function (store, id) {
        return httpRequest(`/file${id}/get`, 'get', store);
    },
    add: function (store, id, params) {
        return httpRequest(`/file${id}`, 'post', store, params);
    },
    delete: function (store, id, params) {
        return httpRequest(`/file${id}/delete`, 'post', store, params);
    },
    getprofessor: function (store){
        return httpRequest(`/file/getallprofessor`, 'get', store);
    }
}