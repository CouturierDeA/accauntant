import { MutationTree } from 'vuex';

import RootState from 'store/root/state';


export function setLoading(state, isLoading) {
    state.loading = isLoading;
}
export function setLocale(state, locale) {
    state.locale = locale;
}

export default {
    setLoading,
    setLocale,
};
