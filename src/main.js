import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueWait from 'vue-wait'
import {Message} from 'iview'
import 'iview/dist/styles/iview.css';
import '@/css/style.less';
import '@/css/calendar.less';
import '@/mock/mock.js';
Vue.config.productionTip = false;
Vue.prototype.$Message = Message;
Vue.prototype.$Message.config({
  top: window.innerHeight/2
});
Vue.use(VueWait);
new Vue({
  router,
  store,
  wait: new VueWait({
    useVuex: true
  }),
  render: h => h(App)
}).$mount('#app');
