import axios from "axios";

export function getCity(cityId) {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/v1/cities/cityId`);
};

export function getCityName(searchTerm) {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/v1/cities?name=${searchTerm}`);
};