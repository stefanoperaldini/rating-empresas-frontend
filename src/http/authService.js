import axios from 'axios';

export function signIn(loginData) {
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}/v1/accounts/login`, loginData);
}