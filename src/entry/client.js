import Vue from 'vue';

import I18n from 'I18n';
import {setup} from '../app-setup';
import store from 'store';

import GlobalComponents from 'src/global-components/global-components.js';
import VueInternalization from "../I18n";

Vue.use(GlobalComponents);

VueInternalization.init([
  store.state.locale

]).then((i18n) => {
  setup.i18n = i18n;
  new Vue(setup);
});



I18n.init([
    store.state.locale,
    navigator.language,
]).then((i18n) => {
    setup.i18n = i18n;
    new Vue(setup).$mount('#app');
});
//
// if (module.hot) {
//     module.hot.status((status) => {
//         // console.log('status', status);
//         if (status === 'abort') {
//             alert('hot checking aborted, reloading...');
//             window.location.reload();
//         }
//     });
//
//     module.hot.accept((errHandler) => {
//         // console.log('main accept error', errHandler);
//     });
//
//     module.hot.dispose(() => {
//         // console.log('main disposed');
//         // console.log(module.hot.data);
//     });
// }
