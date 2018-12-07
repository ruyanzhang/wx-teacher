import axios from 'axios';

export function request (url, options) {
  return axios({
    url: url,
    method: options.method || 'get',
    params: options.data || {},
  }).then((data) => {
    return data
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
    return data
  }).catch(function (error) {
    console.log(error);
  });
}
