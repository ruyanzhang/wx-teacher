import { requestPost } from '../utils/request'
import config from  '../utils/config'
const { userGetOpenId } = config.api;

export async function getUserOpenId (params) {
  return requestPost(userGetOpenId, {
    method: 'get',
    data:params
  })
}
