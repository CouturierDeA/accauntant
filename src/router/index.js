import Vue from 'vue';
import Router from 'vue-router';

import * as AccauntantTable from 'components/accauntant-table/AccauntantTable.vue';
import dataBus from '../data/data.bus';
import * as SignIn from 'components/pages/sign-in/SignIn.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'sign_in',
            component: SignIn
        },
        {
            path: '/accauntant-table',
            name: 'accauntant-table',
            component: AccauntantTable
        }
    ],

    beforeEach(to,
               from,
               next) {
        dataBus.loading = true;

        if (to.matched.some((record) => record.meta.requiresAuth)) {
            next();
            if (!store.state.user.authorized) {
                next({
                    path: '/login',
                });
            } else {
                next();
            }
        } else {
            next();
        }
    },
    afterEach(to, from) {
        dataBus.loading = false;
    },
    onReady() {
        dataBus.loading = false;
    }

})