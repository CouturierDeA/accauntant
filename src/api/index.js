import axios from 'axios';
import store from '../store';
import dataBus from 'src/data/data.bus';

export const instance = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
});

instance.interceptors.request.use((config) => {
  store.commit('addLoader');
  return config;
}, (error) => {
  store.state.loading = false;
  return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
  store.commit('deleteLoader');
  return response;
}, (error) => {
  store.commit('deleteLoader');
  let message;

  const status = error.response && error.response.status ? error.response.status : undefined;

  switch (status) {
    case 304:
      message = 'errors.access_denied';
      break;
    default:
      message = 'errors.common';
      break;
  }

  dataBus.$emit('translateError', message);

  return Promise.reject(error);
});

export default instance;
