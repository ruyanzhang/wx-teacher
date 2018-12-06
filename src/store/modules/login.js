import {login,loginOut} from '../../services/login'
const state = {
  user_password: '',
  user_name: '',
  loginError:''
};

const getters = {

};

const mutations = {
  getLocalUser (state) {
    state.login_email = localStorage.getItem('email');
    state.login_token = localStorage.getItem('token');
    state.login_name = localStorage.getItem('name');
  },
  updateUser (state, payload) {
    state = {...state,...payload};
  },
  logout (state) {
    localStorage.removeItem('token');
    state.loginError = '';
    state.user_name = '';
    state.user_password = '';
  }
}

const actions = {
  async login ({ commit }, payload) {
    const userData = await login(payload);
    if(userData.status===200 && userData.statusText==='OK'){
      commit({
        type: 'updateUser',
        payload:userData.data
      });
      return Promise.resolve(userData.data);
    }else{
      return Promise.resolve(userData.msg);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions
}
