export function setToken(value){
  window.localStorage.setItem('token',value);
}

export function getToken(){
  return window.localStorage.getItem('token');
}

export function removeToken(){
  return window.localStorage.removeItem('token');
}

