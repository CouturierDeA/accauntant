import API from 'src/api';
import DataBus from 'src/data/data.bus'

function login(store, user) {
  return API.post('/login', {
    email: user.email,
    password: user.password,

  }).then((response) => {
    store.commit('setAuthorized', response.data);
    return response.data;

  }).catch(error => {
    console.dir(error.response.status);
    const status = error.response && error.response.status ? error.response.status : undefined;
    let message;
    switch(status){
      case 304:
        message = 'access denied';
        break;
      default:
        message = 'Something went wrong...  ';
    }

    DataBus.$message({
      type: 'error',
      message: message
    });
    return Promise.reject(error.response.status);
  });
}

function resetAuthorization(store) {
  store.commit('setAuthorized', null);
}

export default {
  login,
  resetAuthorization,
};
