import axios from 'axios';

const storedUser = JSON.parse(localStorage.getItem('currentUser'));

let accessToken = (storedUser && storedUser.accessToken) || null;

axios.interceptors.request.use(
    function (config) {

        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    function (response) {
        if (response.data.accessToken) {
            localStorage.setItem('currentUser', JSON.stringify(response.data));
            accessToken = response.data.accessToken;
        }
        return response;
    },
    function (error) {
        if (error.response.status === 401) {
            localStorage.removeItem('currentUser');
            window.location.href = '/account/login';
        }
        return Promise.reject(error);
    }
);

export function signIn(loginData) {
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}/v1/accounts/login`, loginData);
};

export function signUp(accountData) {
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}/v1/accounts`, accountData);
};

export function passwordChange(passwordChangeData) {
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}/v1/accounts/password/change`, passwordChangeData);
};
