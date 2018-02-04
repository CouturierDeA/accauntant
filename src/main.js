import Vue from 'vue';

import GlobalComponents from './components/global-components/global-components.js';
import VueInternalization from "./I18n";

import store from './store';

import {params} from './params';

Vue.use(GlobalComponents);

VueInternalization.init([
    store.state.locale

]).then((i18n) => {
    params.i18n = i18n;
    new Vue(params);
});

