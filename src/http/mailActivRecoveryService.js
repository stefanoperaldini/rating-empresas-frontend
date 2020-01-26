import axios from "axios";

export function mailActivationRecovery(email) {
  return axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/v1/accounts/email/activation/recovery`,
    email
  );
}
