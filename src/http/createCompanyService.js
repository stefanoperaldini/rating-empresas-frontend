import axios from "axios";

const accessToken = localStorage.getItem("token");

console.log(accessToken);

export function createCompany(companyData) {
  return axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/v1/companies`,
    companyData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );
}
