import axios from "axios";

export function getCompanies(queryString) {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/v1/companies?${queryString}`);
}

export function getCompany(idCompany) {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/v1/companies/${idCompany}`);
}

export function getCompanyCities(idCompany) {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/v1/companies/cities/${idCompany}`);
}

export function getCompaniesCities() {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/v1/companies/cities/active`);
}

export function createCompany(companyData) {
  return axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/v1/companies`,
    companyData
  );
}

export function updateCompany(companyId, formDataCompany) {
  return axios.put(
    `${process.env.REACT_APP_BACKEND_URL}/v1/companies/${companyId}`,
    formDataCompany
  );
}

export function getSectors() {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/v1/sectors`);
}

export function createSector(sectorData) {
  return axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/v1/sectors`,
    sectorData
  );
}

export function uploadLogo(dataForm) {
  return axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/v1/companies/logo`,
    dataForm
  );
}
