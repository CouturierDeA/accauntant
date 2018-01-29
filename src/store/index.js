import Vue from 'vue';
import Vuex from 'vuex';

import userModule from './modules/user';
import actions from './root/actions';
import getters from './root/getters';
import mutations from './root/mutations';
import RootState from './root/state';

Vue.use(Vuex);

const plugins = [];

export const store = new Vuex.Store({
    actions,
    getters,
    modules: {
        user: userModule,
    },
    mutations,
    plugins,
    state: new RootState(),
});


export default store;
