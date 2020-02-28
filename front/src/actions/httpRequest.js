import axios from 'axios'
import config from '../utils/config'
import { RequestStatus } from '../utils/consts'


const MAX_RETRY = 3;

export async function httpRequest(url, method, store, params, retry) {
  retry = retry || 0
  if (retry > MAX_RETRY){
    store.requestStatus = RequestStatus.Error
    return store
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
    store.data = data
    return store
  }
  catch (error) {
    return httpRequest(url, method, store, params, retry + 1)
  }
}