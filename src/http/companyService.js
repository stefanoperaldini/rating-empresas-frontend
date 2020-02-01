import axios from "axios";

export function createCompany(companyData) {
  return axios.post(`${process.env.REACT_APP_BACKEND_URL}/v1/companies`, companyData);
};
