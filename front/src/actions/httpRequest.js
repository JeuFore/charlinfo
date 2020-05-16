import axios from 'axios';
import config from '../utils/config';
import { RequestStatus } from '../utils/consts';
import user from '../actions/user';

const MAX_RETRY = 3;

export async function httpRequest(url, method, store, params, retry = 0, error) {
  if (retry > MAX_RETRY) {
    if (error.response) {
      if (error.response.status === 502)
        return error.response.status
      if (error.response.status === 401){
        user.disconnect(store);
        return window.location.replace('/connexion');
      }
      store.requestStatus = error.response.data;
    }
    return store;
  }
  try {
    const { data } = await axios({
      baseURL: config.localApiUrl,
      url,
      method,
      data: params,
      withCredentials: true
    });
    store.requestStatus = RequestStatus.Success;
    store.data = data;
    return store;
  }
  catch (error) {
    return httpRequest(url, method, store, params, retry + 1, error)
  }
}

export async function httpFileRequest(url, method, store, params, file) {
  try {
    const { data } = await axios({
      baseURL: config.localApiUrl,
      url,
      method,
      headers: {
        'content-type': 'multipart/form-data'
      },
      data: file,
      params,
      withCredentials: true,
      onUploadProgress: (p) => {
        return store.upload = ((p.loaded / p.total) * 100)
      }
    });
    store.requestStatus = RequestStatus.Success;
    store.data = data;
    return store;
  }
  catch (error) {
    if (error.response) {
      if (error.response.status === 401)
        user.disconnect(store);
      store.requestStatus = error.response.data;
    }
    return store;
  }
}