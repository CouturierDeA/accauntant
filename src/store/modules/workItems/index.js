
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import workItemsState from './state';

export default {
    namespaced: true,
    state: workItemsState,
    getters,
    actions,
    mutations: mutations
}
