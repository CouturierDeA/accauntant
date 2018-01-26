import Vue from 'vue';
import Router from 'vue-router';

import * as AccountantTable from 'components/accountant-table/AccountantTable.vue';
import dataBus from '../data/data.bus';
import * as SignIn from 'components/pages/sign-in/SignIn.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'First page',
            component: SignIn
        },
        {
            path: '/accountant-table',
            name: 'Accountant Table',
            component: AccountantTable
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