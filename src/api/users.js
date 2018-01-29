
import API from '../api';
//
// export default class Users {
//
// }
function getAll() {
    return API.get('/users').then((response) => {
        return response.data;
    });
}

function register(user) {
    return API.get('/users', {
        params: {
            email: user.email,
        },
    }).then((response) => {
        const users = response.data;

        if (users.length > 0) {
            return Promise.reject(1);
        }

        return API.post('/users', user)
            .then((postResponse) => {
                return postResponse.data;
            });
    });
}

function login(email, password) {
    return API.post('/login', {
        email,
        password,

    }).then((response) => {
        const user = response.data;
        console.log(user);

        if (user.length === 0) {
            return Promise.reject(1);
        }

        return user;

    }).catch(error => {
        return Promise.reject(1);
    });
}

export default {
    getAll,
    register,
    login,

}
