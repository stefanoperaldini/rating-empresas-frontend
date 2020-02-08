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
import { useAuth } from "../context/auth-context";
import defaultImageCompany from "../img/company-default.png";

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
  const { register } = useForm({
    mode: "onBlur"
  });
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();
  const params = useParams();
  const idCompany = params.id;
  const { currentUserId, role } = useAuth();

  useEffect(() => {
    getCompany(idCompany).then(response => {
      setCompany(response.data);
    });
    getReviewsFilter(idCompany).then(response => {
      setReviewsCompanyList(response.data.reviews);
    });
    return;
  }, [idCompany]);

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
      <main className="centered-container-home">

        {(!currentUserId || role === "1") && (
          <section className="allWidth centeredComponentRate">
            <header>
              <h3>{t("Do you want to rate a company?")}</h3>
              <p>{t("Your reviews will be anonimous")}</p>
            </header>
            <main className={classes.rating}>
              <Rating
                name="overall_rating"
                size="large"
                value="0"
                precision={1}
                onChange={() => {
                  history.push("/review/create");
                }}
              />
            </main>
          </section>
        )}

        <section className="companyDetail">

          <header className="companyTitle flexRow m-t-lg b-b">
            <img
              src={defaultImageCompany}
              alt={t("Default image company")}
            />
            <h2>{company.name}</h2>
          </header>

          <aside className="asideCompany b-l">
            <div className={classes.rating}>
              <span>{t("Overall rating")}</span>
              4.5
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
              4.5
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
              4.5
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
              4.5
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
              4.5
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
              4.5
            <Rating
                name="personal_life"
                id="personal_life"
                size="small"
                value={"4"}
                precision={1}
                readOnly={true}
              />
            </div>

            <section>
              <h5> {company.name} </h5>
              <p>
                {company.sector}
              </p>
              <p>
                {company.description}
              </p>
              <p>
                {company.address} - {company.city_name}
              </p>
              <p>{company.url_web}</p>
              <p>{company.linkedin}</p>
            </section>
          </aside>

          <main className="ratingCompany">
            <section >
              <form onSubmit className="flexRow">
                <h5>{t("Search for")}:</h5>
                <ul className="flexRow">
                  <li>
                    <select name="position" id="position" ref={register}>
                      <option value="Empty">&#60;{t("Job title")}&#62;</option>
                      <option value="Software developer">Software developer</option>
                      <option value="Project owner">Project owner</option>
                      <option value="Team leader">Team leader</option>
                    </select>
                  </li>
                  <li>
                    <select name="city" id="city" ref={register}>
                      <option value="Empty">&#60;{t("City")}&#62;</option>
                      <option value="Coruña">Coruña, A</option>
                      <option value="Madrid">Madrid</option>
                      <option value="Vigo">Vigo</option>
                    </select>
                  </li>
                </ul>
              </form>
            </section>

            <section>
              <h5>
                {t("Average salary")} 1.250,00 € / {t("month")}
              </h5>
            </section>

            <section>
              <form onSubmit>
                <label htmlFor="sort">{t("Sort by")}</label>
                <select name="sort" id="sort" ref={register}>
                  <option value="1">{t("Overall rating")}</option>
                  <option value="2">{t("Salary")}</option>
                  <option value="3">{t("Internal training")}</option>
                  <option value="4">{t("Growth opportunities")}</option>
                  <option value="5">{t("Work environment")}</option>
                  <option value="6">{t("Work&Life balance")}</option>
                </select>
              </form>
            </section>

            <section>
              <ul>
                {reviewsCompanyList.map(review => (
                  <li key={review.id}>
                    <article>
                      <header>
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
        </section>
      </main>
      <Footer />
    </React.Fragment >
  );
}
