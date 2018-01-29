import { GetterTree } from 'vuex';

import RootState from 'store/root/state';

export function loading(state) {
    return state.loading;
}

export default {
    loading,
};
