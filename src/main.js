import Vue from 'vue';
import ElementUI from 'element-ui';

import router from './router';
import store from './store';

import App from './App.vue';
import GlobalVomponents from './components/global-components/global-components.js'

Vue.use(GlobalVomponents);
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el         : '#app',
  store,
  router,
  template   : '<App/>',
  components : {App},
});
