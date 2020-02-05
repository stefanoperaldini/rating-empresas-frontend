import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";

import { getCompany } from "../http/companyService";
import { getReviewsFilter } from "../http/reviewService";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { setErrorMessageCallBackEnd } from "./pagesUtils";

/**
 * Page company detail
 */

const useStyles = makeStyles({
  rating: {
    width: 200,
    display: "flex",
    alignItems: "center"
  }
});

export function Company() {
  const [company, setCompany] = useState({});
  const [reviewsCompanyList, setReviewsCompanyList] = useState([]);
  const { handleSubmit, register, errors, formState, setError } = useForm({
    mode: "onBlur"
  });
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();
  const params = useParams();
  const idCompany = params.id;

  useEffect(() => {
    getCompany(idCompany).then(response => {
      setCompany(response.data);
    });
    getReviewsFilter(idCompany).then(response => {
      setReviewsCompanyList(response.data.reviews);
    });
    return;
  }, []);

  if (reviewsCompanyList === null) {
    return (
      <div>
        <h3>{t("This company doesn't have any review")}</h3>
      </div>
    );
  }

  return (
    <React.Fragment>
      <Header />
      <main className="company">
        <p>
          <h3>{t("Do you want to rate a company?")}</h3>
          <h4>{t("Your reviews will be anonimous")}</h4>
          <div className={classes.rating}>
            <Rating
              name="overall_rating"
              size="large"
              value="0"
              precision={1}
              onChange={() => {
                history.push("/account/login");
              }}
            />
          </div>
        </p>
        <article className="box-article">
          <header className="box-header">
            {/* <img class="company-logo"
              src="{company.url_logo}"
              alt={t("Company logo")}> */}
            <h4>{company.name}</h4>
          </header>
          <main>
            <section>
              <div className={classes.rating}>
                <span>{t("Overall rating")}</span>
                <Rating
                  name="overall_rating"
                  id="overall_rating"
                  size="large"
                  value="4"
                  precision={1}
                  readOnly={true}
                />
              </div>
              <div className={classes.rating}>
                <span>{t("Salary")}</span>
                <Rating
                  name="salary_valuation"
                  id="salary_valuation"
                  size="small"
                  value={"3"}
                  precision={1}
                  readOnly={true}
                />
              </div>
              <div className={classes.rating}>
                <span> {t("Internal training")}</span>
                <Rating
                  name="inhouse_training"
                  id="inhouse_training"
                  size="small"
                  value={"4"}
                  precision={1}
                  readOnly={true}
                />
              </div>
              <div className={classes.rating}>
                <span>{t("Growth opportunities")}</span>
                <Rating
                  name="growth_opportunities"
                  id="growth_opportunities"
                  size="small"
                  value={"4"}
                  precision={1}
                  readOnly={true}
                />
              </div>
              <div className={classes.rating}>
                <span>{t("Work environment")}</span>
                <Rating
                  name="work_enviroment"
                  id="work_enviroment"
                  size="small"
                  value={"4"}
                  precision={1}
                  readOnly={true}
                />
              </div>
              <div className={classes.rating}>
                <span>{t("Work&Life balance")}</span>
                <Rating
                  name="personal_life"
                  id="personal_life"
                  size="small"
                  value={"4"}
                  precision={1}
                  readOnly={true}
                />
              </div>
            </section>
            <section className="box-section">
              <h5> {company.name} </h5>
              <p>
                {t("Sector")} {company.sector}
              </p>
              <p>
                {t("About us")} {company.description}
              </p>
              <p>
                {t("Headquarters")} {company.address} - {company.city_name}
              </p>
              <p>{t("Contact")}</p>
              <p>{company.url_web}</p>
              <p>{company.linkedin}</p>
            </section>
          </main>
        </article>
        <section>
          <h5>{t("Search for")}:</h5>
          <form onSubmit>
            <ul className="select-box">
              <li>
                <label htmlFor="position">{t("Job title")}</label>
                <select name="position" id="position" ref={register}>
                  <option value="Empty"></option>
                  <option value="Software developer">Software developer</option>
                  <option value="Project owner">Project owner</option>
                  <option value="Team leader">Team leader</option>
                </select>
              </li>
              <li>
                <label htmlFor="city">{t("City")}</label>
                <select name="city" id="city" ref={register}>
                  <option value="Empty"></option>
                  <option value="Coruña">Coruña, A</option>
                  <option value="Madrid">Madrid</option>
                  <option value="Vigo">Vigo</option>
                </select>
              </li>
            </ul>
          </form>
        </section>
        <section className="box-section">
          <h5>
            {t("Average salary")} 1.250,00 € / {t("month")}
          </h5>
        </section>
        <h5>{t("Sort by")}:</h5>
        <section className="box-flex">
          <div className="btn-filter">
            <button className="btn">{t("Overall rating")}</button>
          </div>
          <div className="btn-filter">
            <button className="btn">{t("Salary")}</button>
          </div>
          <div className="btn-filter">
            <button className="btn">{t("Internal training")}</button>
          </div>
          <div className="btn-filter">
            <button className="btn">{t("Growth opportunities")}</button>
          </div>
          <div className="btn-filter">
            <button className="btn">{t("Work environment")}</button>
          </div>
          <div className="btn-filter">
            <button className="btn">{t("Work&Life balance")}</button>
          </div>
        </section>
        <section>
          <ul className="review-list">
            {reviewsCompanyList.map(review => (
              <li key={review.id}>
                <article>
                  <header className="box-header">
                    <p>
                      {review.name} ({review.start_year}-{review.end_year}) -{" "}
                      {review.city_name}. {review.created_at}
                    </p>
                  </header>
                  <main>
                    <h5>{review.comment_title}</h5>
                    <textarea>{review.comment}</textarea>
                    <div className={classes.rating}>
                      <span>{t("Overall rating")}</span>
                      <Rating
                        name={review.id["overall_rating"]}
                        id={review.id["overall_rating"]}
                        size="large"
                        value="4"
                        precision={1}
                        readOnly={true}
                      />
                    </div>
                    <div className={classes.rating}>
                      <span>{t("Salary")}</span>
                      <Rating
                        name={review.id["salary_valuation"]}
                        id={review.id[" salary_valuation"]}
                        size="small"
                        value={review.salary_valuation}
                        precision={1}
                        readOnly={true}
                      />
                    </div>
                    <div className={classes.rating}>
                      <span> {t("Internal training")}</span>
                      <Rating
                        name={review.id["inhouse_training"]}
                        id={review.id[" inhouse_training"]}
                        size="small"
                        value={review.inhouse_training}
                        precision={1}
                        readOnly={true}
                      />
                    </div>
                    <div className={classes.rating}>
                      <span>{t("Growth opportunities")}</span>
                      <Rating
                        name={review.id["growth_opportunities"]}
                        id={review.id["growth_opportunities"]}
                        size="small"
                        value={review.growth_opportunities}
                        precision={1}
                        readOnly={true}
                      />
                    </div>
                    <div className={classes.rating}>
                      <span>{t("Work environment")}</span>
                      <Rating
                        name={review.id["work_enviroment"]}
                        id={review.id["work_enviroment"]}
                        size="small"
                        value={review.work_enviroment}
                        precision={1}
                        readOnly={true}
                      />
                    </div>
                    <div className={classes.rating}>
                      <span>{t("Work&Life balance")}</span>
                      <Rating
                        name={review.id["personal_life"]}
                        id={review.id["personal_life"]}
                        size="small"
                        value={review.personal_life}
                        precision={1}
                        readOnly={true}
                      />
                    </div>
                  </main>
                </article>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </React.Fragment>
  );
}
