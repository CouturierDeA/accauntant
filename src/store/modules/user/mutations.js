import {MutationTree} from 'vuex';

import UserState from 'store/modules/user/state';


export function add(state, user) {
    state.all.push(user);
}

export function setAuthorized(state, user) {
    if (user && user.password) {
        delete user.password;
    }
    state.authorized = user
}

export function setList(state, users) {
    state.all = users;
}

export default {
    add,
    setAuthorized,
    setList,
};
