import Vue from 'vue'
import Vuex from 'vuex'
import login from "./modules/login";
import home from './modules/home';
import mistake from './modules/mistake';
import report from  './modules/report'
Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    login,
    home,
    mistake,
    report
  }
})
