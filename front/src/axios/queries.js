import axios from './axios';
import localStorageService from './localStorageService';

export const signIn = (values) => {
    return axios.post('/signin', values)
        .then(res => {
            localStorageService.setToken(res.data.tokens);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.tokens.accessToken;
            return res.data.username;
        });
};