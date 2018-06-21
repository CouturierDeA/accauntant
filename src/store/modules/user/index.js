
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import userState from './state';

export default {
    namespaced: true,
    state: userState,
    getters,
    actions,
    mutations: mutations
}
