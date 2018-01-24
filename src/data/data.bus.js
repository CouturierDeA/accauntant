import Vue from 'vue';

import {items} from './data.items';

export default new Vue({
    data() {
        return {
            current_popup: null,
            loading: false,
            items,
            total_count: 0,
            total_price: 0,
        }
    }
});
