import request from '../../utils/request';
import {login,loginOut} from '../../services/login'
const state = {
  user_password: '',
  user_name: '',
  loginError:''
};

const getters = {
  // Filtering currentUser
  currentUser: state => {
    return {
      email: state.login_email,
      token: state.login_token,
      name: state.login_name
    }
  }
}

const mutations = {
  updateData (state, payload) {
    switch (payload.name) {
      case 'email':
        state.temp_email = payload.value
        break
      case 'token':
        state.temp_token = payload.value
        break
      case 'name':
        state.temp_name = payload.name
        break
      default:
        console.log('Error:Dont directly mutate Vuex store')
    }
  },
  getLocalUser (state) {
    state.login_email = localStorage.getItem('email')
    state.login_token = localStorage.getItem('token')
    state.login_name = localStorage.getItem('name')
  },
  updateUser (state, payload) {
    state = {...state,...payload};
  },
  logout (state) {
    localStorage.removeItem('email')
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    state.login_email = ''
    state.login_token = ''
    state.login_name = ''
  }
}

const actions = {
  /**
   * Login
   * new Promise((resolve, reject) => {})
   * Authorization: 'Bearer ' + token
   * email: payload.email
   * pass: payload.pass
   * name: payload.name
   */
  async login ({ commit }, payload) {
    const userData = await login(payload);
    if(userData.status===200){
      commit({
        type: 'updateUser',
        payload:userData.data
      });
      return Promise.resolve(userData.data);
    }else{
      return Promise.resolve(userData.msg);
    }
    /*return new Promise((resolve, reject) => {
      request
        .get('https://douban.herokuapp.com/user/' + payload.email)
        .set('Authorization', 'Bearer ' + payload.token)
        .then(res => {
          commit({
            type: 'setUser',
            email: res.body.email,
            token: res.body.token,
            name: res.body.name
          })
          resolve(res)
        }, err => {
          reject(err)
        })
    })*/
  },
  /**
   * Register
   * new Promise((resolve, reject) => {})
   * email: payload.email
   * pass: payload.pass
   * name: payload.name
   */
  register ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      request
        .post('https://douban.herokuapp.com/user/')
        .send({
          email: payload.email,
          pass: payload.pass,
          name: payload.name
        })
        .then(res => {
          localStorage.setItem('token', res.body.token)
          localStorage.setItem('email', res.body.email)
          localStorage.setItem('name', res.body.name)

          commit({
            type: 'setUser',
            email: res.body.email,
            token: res.body.token,
            name: res.body.name
          })
          resolve(res)
        }, err => {
          reject(err)
        })
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
