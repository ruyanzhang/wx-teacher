import axios from 'axios';
import { Message } from 'iview'
export function request (url, options) {
  return axios({
    url: url,
    method: options.method || 'get',
    params: options.data || {},
  }).then((data) => {
    if(data.status===200 && data.statusText==='OK'){
      return data
    } else {
      Message.error(data)
    }
  }).catch(function (error) {
    console.log(error);
  });
}

export function requestPost (url, options) {
  return axios({
    url: url,
    method: options.method || 'post',
    data: JSON.stringify(options.data) || {},
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((data) => {
    if(data.status===200 && data.statusText==='OK'){
      return data
    } else {
      Message.error(data.msg)
    }
  }).catch(function (error) {
    console.log(error);
  });
}
