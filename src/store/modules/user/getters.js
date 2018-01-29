import { GetterTree } from 'vuex';

import UserState from 'store/modules/user/state';
import RootState from 'store/root/state';

export function authorized(state) {
    return state.authorized;
}

export function totalCount(state) {
    return state.all.length;
}

export default {
    authorized,
    totalCount,
};
