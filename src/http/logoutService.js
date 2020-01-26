import axios from 'axios';


export function logOut() {
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}/v1/accounts/logout`);
}