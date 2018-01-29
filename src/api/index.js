import axios from 'axios';

import store from '../store';

export const instance = axios.create({
    baseURL: process.env.API_URL,
});

instance.interceptors.request.use((config) => {
    store.state.loading = true;
    return config;
}, (error) => {
    store.state.loading = false;
    return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
    store.state.loading = false;
    return response;
}, (error) => {
    store.state.loading = false;
    return Promise.reject(error);
});

export default instance;
