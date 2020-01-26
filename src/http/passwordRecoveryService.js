import axios from "axios";

export function passwordRecovery(email) {
  return axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/v1/accounts/password/recovery`,
    email
  );
}
