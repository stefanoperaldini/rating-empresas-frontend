import axios from "axios";

export function deleteUser() {
  return axios.delete(`${process.env.REACT_APP_BACKEND_URL}/v1/users`);
}
