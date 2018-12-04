import { request } from '../utils'
import * as serverConfig from '../utils/serverConfig'

export async function login (params) {
  var url = serverConfig.LOGINURL +'login?username='+params.username + '&password=' + params.password;
  // return request(url, {
  //   method: 'post',
  // });
}
