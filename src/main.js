// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App.vue';
import router from './router';

// import 'material-design-icons/iconfont/material-icons.css';
// import KeenUI from 'keen-ui';
// import VeeValidate from 'vee-validate';
import 'scss/core.scss';

// Vue.use(KeenUI);

/* eslint-disable no-new */
new Vue({
  el         : '#app',
  router,
  template   : '<App/>',
  components : {App},
});
