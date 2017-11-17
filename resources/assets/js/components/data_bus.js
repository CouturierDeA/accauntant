import Vue from 'vue';

import {items} from './data.items';

export default new Vue({

    data(){

        return {

            items,

            total_count: 0,

            total_price: 0,

        }

    }
});