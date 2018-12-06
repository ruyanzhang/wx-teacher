import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {Message} from 'iview'
import 'iview/dist/styles/iview.css';
import './mock/mock.js';
Vue.config.productionTip = false;
Vue.prototype.$Message = Message;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
