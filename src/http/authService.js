import axios from 'axios';

axios.interceptors.request.use(
    function (config) {
        const currentAccessToken = localStorage.getItem('accessToken');
        let accessToken = currentAccessToken || null;

        if (accessToken) {
            // FIXME Decidir cuando poner
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    function (error) {
        // Siempre devolver el error de esta forma, a través de Promise.reject
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
