import Vue from 'vue';
import ElementUI from 'element-ui';

import router from './router';
import store from './store';

import App from './App.vue';
import GlobalComponents from './components/global-components/global-components.js';

Vue.use(GlobalComponents);
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el         : '#app',
  store,
  router,
  template   : '<App/>',
  components : {App},
});
