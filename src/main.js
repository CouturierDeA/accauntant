import Vue from 'vue';
import ElementUI from 'element-ui';

import router from './router';
import store from './store';

import App from './App.vue';
import GlobalComponents from './components/global-components/global-components.js';
import VueInternalization from "./I18n";

VueInternalization.init([]);

Vue.use(GlobalComponents);
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    i18n: VueInternalization.i18n,
    router,
    template: '<App/>',
    components: {App}
});
