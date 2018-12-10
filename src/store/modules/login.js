import {login,loginOut} from '../../services/login';
import {removeToken} from '@/utils/index';
const state = {
  user_password: '',
  user_name: '',
  loginError:''
};

const getters = {

};

const mutations = {
  getLocalUser (state) {
    state.login_token = localStorage.getItem('token');
    state.login_name = localStorage.getItem('name');
  },
  updateState (state, payload) {

  },
  logout (state) {
    removeToken();
    state.loginError = '';
    state.user_name = '';
    state.user_password = '';
  }
};

const actions = {
  async login ({ commit }, payload) {
    const data = await login(payload);
    if(data.status===200 && data.statusText==='OK'){
      commit({
        type: 'updateState',
        payload:data.data
      });
      return Promise.resolve(data.data);
    }else{
      return Promise.resolve(data.msg);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions
}
