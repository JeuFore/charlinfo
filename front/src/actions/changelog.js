import request from './httpRequest'

export default {
    get: async function () {
        return await request("/changelog/get")
    },
    add: async function () {
        return null
    },
    delete: async function () {
        return null
    }
}