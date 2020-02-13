import axios from "axios";

export function getReviewUserList() {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/v1/reviews/user/list`);
}

export function getReview(idReview) {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/v1/reviews/${idReview}`);
}

export function deleteReview(idReview) {
  return axios.delete(`${process.env.REACT_APP_BACKEND_URL}/v1/reviews/${idReview}`);
}

export function getReviewsFilter(id) {
  return axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/v1/reviews/filter/all?companyId=${id}`
  );
}

export function getPositions() {
  return axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/v1/positions`
  );
}

export function getPositionsCompany(idCompany) {
  return axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/v1/positions/company/${idCompany}`
  );
}

export function createPosition(dataPosition) {
  return axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/v1/positions`, dataPosition
  );
}

export function createReview(dataReview) {
  return axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/v1/reviews`, dataReview
  );
}

export function reportReview(idReview) {
  return axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/v1/reviews/blacklist/${idReview}`);
}
