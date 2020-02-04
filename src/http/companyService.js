import axios from "axios";

export function createCompany(companyData) {
  return axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/v1/companies`,
    companyData
  );
}

export function getCompany(id) {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/v1/companies/${id}`);
}

export function getCompanies() {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/v1/companies`);
}
