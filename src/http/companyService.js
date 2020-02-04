import axios from "axios";

export function getCompanies() {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/v1/companies`);
};

export function createCompany(companyData) {
  return axios.post(`${process.env.REACT_APP_BACKEND_URL}/v1/companies`, companyData);
};

export function updateCompany(companyId, formDataCompany) {
  return axios.put(`${process.env.REACT_APP_BACKEND_URL}/v1/companies/${companyId}`, formDataCompany);
};

export function getSectors() {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/v1/sectors`);
};

export function createSector(sectorData) {
  return axios.post(`${process.env.REACT_APP_BACKEND_URL}/v1/sectors`, sectorData);
};
