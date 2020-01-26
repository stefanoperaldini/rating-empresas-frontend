import axios from 'axios';

export function activateAccount(verificationCode) {
    console.log(`${process.env.REACT_APP_BACKEND_URL}/v1/accounts/activate/${verificationCode}`);
    return axios.put(`${process.env.REACT_APP_BACKEND_URL}/v1/accounts/activate/${verificationCode}`);
}