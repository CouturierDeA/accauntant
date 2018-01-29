import UsersApi from '../../../api/Users';

function fetchAll(store,) {
    return UsersApi.getAll().then((users) => {
        store.commit('setList', users);

        return users;
    });
}

function login(store, user,) {

    return UsersApi.login(user.email, user.password)
        .then((user) => {
            store.commit('setAuthorized', user);
            return user;
        });
}

function resetAuthorization(store,) {
    store.commit('setAuthorized', null);
}

function signUp(store, user,) {
    return UsersApi.register(user)
        .then((addedUser) => {
            store.commit('add', addedUser);
            store.commit('setAuthorized', user);
            return addedUser;
        });
}

export default {
    fetchAll,
    login,
    resetAuthorization,
    signUp,
};
