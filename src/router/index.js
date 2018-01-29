import Vue from 'vue';
import Router from 'vue-router';

import * as AccountantTable from 'components/accountant-table/AccountantTable.vue';
import dataBus from '../data/data.bus';
import store from '../store';
import * as SignIn from 'components/pages/sign-in/SignIn.vue';

Vue.use(Router);

const routerConfig = {
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Sign In',
            component: SignIn,
            meta: {requiresAuth: false}
        },
        {
            path: '/accountant-table',
            name: 'Accountant table',
            component: AccountantTable,
            meta: {requiresAuth: true}
        },
    ],
};

const router = new Router(routerConfig);

function afterEach(to, from) {
    dataBus.loading = false;
}

function onReady() {
    dataBus.loading = false;
}

function beforeEach(to, from, next) {

    if (to.matched.some((record) => record.meta.requiresAuth)) {
        !store.state.user.authorized ?  next({path: '/',}) : next();

    } else {
        next();
    }
}

router.beforeEach(beforeEach);
router.afterEach(afterEach);
router.onReady(onReady);

export default router;
