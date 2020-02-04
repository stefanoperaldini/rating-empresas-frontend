import axios from "axios";

export function getReviewUserList() {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/v1/reviews/user/list`);
}

export function getReviewsFilter(id) {
  return axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/v1/reviews/filter/all?companyId=${id}`
  );
}
