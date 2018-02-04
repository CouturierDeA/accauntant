import Vue from 'vue';

import GlobalComponents from './components/global-components/global-components.js';
import VueInternalization from "./I18n";

import store from './store';

import {setup} from './app-setup';

Vue.use(GlobalComponents);

VueInternalization.init([
    store.state.locale

]).then((i18n) => {
    setup.i18n = i18n;
    new Vue(setup);
});

