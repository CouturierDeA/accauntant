import store from "./store";
import router from "./router";
import App from './App.vue';

export const setup = {
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App},
  data() {
    return {
      headerHeight: 0
    }
  },
  mounted() {
    // AOS.init();
    // import('aos').then(AOS => AOS.init());
  },
  watch: {
    'headerHeight'(val, oldVal) {
    // Does nothing
    }
  }
};