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
        const user = response.data;
        console.log('user',user);

        if (!user.length === 0) {
            return Promise.reject(1);
        }
        return user;

    }).catch(error => {

        return Promise.reject(1);
    });
}

export default {
    getAll,
    login,
}
