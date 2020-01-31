import axios from "axios";

export function getLinkedin() {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/v1/users`);
}

export function updateLinkedin(linkedin) {
  return axios.patch(`${process.env.REACT_APP_BACKEND_URL}/v1/users`, linkedin);
}
