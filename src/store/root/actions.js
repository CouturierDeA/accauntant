import { ActionContext, ActionTree } from 'vuex';

import RootState from 'store/root/state';

export function startLoading(store) {
    store.commit('setLoading', true);
}

export function stopLoading(store) {
    store.commit('setLoading', false);
}
export default {
    startLoading,
    stopLoading,
};
