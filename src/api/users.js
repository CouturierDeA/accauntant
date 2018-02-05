import API from '../api';

function getAll() {
    return API.get('/users').then((response) => {
        return response.data;
    });
}

function login(email, password) {
    return API.post('/login', {
        email,
        password,

    }).then((response) => {

        return response.data;

    }).catch(error => {

        return Promise.reject(1);
    });
}

export default {
    getAll,
    login,
}
