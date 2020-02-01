import axios from "axios";

export function deleteUser() {
  return axios.delete(`${process.env.REACT_APP_BACKEND_URL}/v1/users`);
}

export function getUser() {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/v1/users`);
}

export function updateUser(linkedin) {
  return axios.patch(`${process.env.REACT_APP_BACKEND_URL}/v1/users`, linkedin);
}
