import Vue from 'vue';
import Router from 'vue-router';
import * as AccauntantTable from 'components/accauntant-table/AccauntantTable.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'accauntant_table',
            component: AccauntantTable
        }
    ]
})
