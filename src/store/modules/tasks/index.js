import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import tasksState from './state';

export default {
    namespaced: true,
    state: tasksState,
    getters,
    actions,
    mutations
}
