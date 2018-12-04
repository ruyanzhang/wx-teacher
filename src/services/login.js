import {request,requestPost} from '../utils/request'
import config from  '../utils/config'
const { userLogin,userGetLogo,userLogout,isBindUrl,sendYZMUrl,restartBinddUrl,isParentBindUrl,parentLoginUrl,parentLogoutUrl,
  sendParentYZMUrl} = config.api;

export async function login (data) {
  return requestPost(userLogin,{
    method: 'post',
    data,
  })
}
export async function parentLogin (data) {
  return requestPost(parentLoginUrl,{
    method: 'post',
    data,
  })
}
export async function loginOut (data) {
  return requestPost(userLogout,{
    method: 'post',
    data,
  })
}
export async function parentLoginOut (data) {
  return requestPost(parentLogoutUrl,{
    method: 'post',
    data,
  })
}
export async function getLogoUrl (params) {
  return request(userGetLogo,{
    method: 'get',
    data: params
  })
}
export async function isBind (params) {
  return request(isBindUrl,{
    method: 'get',
    data: params
  })
}
export async function isParentBind (params) {
  return request(isParentBindUrl,{
    method: 'get',
    data: params
  })
}
export async function sendYZM (params) {
  return request(sendYZMUrl,{
    method: 'get',
    data: params
  })
}
export async function sendParentYZM (params) {
  return request(sendParentYZMUrl,{
    method: 'get',
    data: params
  })
}
export async function restartBind(params) {
  return requestPost(restartBinddUrl,{
    method: 'post',
    data: params
  })
}

