import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";

import { getCompany, getCompanyCities } from "../http/companyService";
import { getReviewsFilter, getPositionsCompany } from "../http/reviewService";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { RateCompanyLink } from "../components/RateCompanyLink";
import { useAuth } from "../context/auth-context";
import defaultImageCompany from "../img/company-default.png";
import { ListReviews } from "../components/ListReviews";

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
  const { handleSubmit, register, formState, } = useForm({
    mode: "onSubmit"
  });
  const [company, setCompany] = useState({});
  const [positionsCompany, setPositionsCompany] = useState([]);
  const [reviewsCompanyList, setReviewsCompanyList] = useState([]);
  const [companyCities, setCompanyCities] = useState([]);
  const classes = useStyles();
  const { t } = useTranslation();
  const params = useParams();
  const idCompany = params.id;
  const { currentUserId, role } = useAuth();

  const location = useLocation();

  useEffect(() => {
    getCompany(idCompany).then(response => {
      setCompany(response.data);
    });
    getPositionsCompany(idCompany).then(response => {
      setPositionsCompany(response.data);
    });
    getCompanyCities(idCompany).then(response => {
      setCompanyCities(response.data);
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
  const handleCompanySearch = formData => {
    console.log("COMPANY SEARCH", formData);
  };

  return (
    <React.Fragment>
      <Header />
      <main className="centered-container-home">
        {(!currentUserId || role === "1") && <RateCompanyLink />}

        <section className="companyDetail">
          <header className="companyTitle flexRow m-t-lg b-b">
            <img src={defaultImageCompany} alt={t("Default image company")} />
            <h2>{company.name}</h2>
          </header>

          <aside className="asideCompany b-l">
            <div className={`${classes.rating} m-l-md`}>
              {company.everage}
              <Rating
                name="overall_rating"
                id="overall_rating"
                size="large"
                value={`${company.everage}`}
                precision={0.5}
                readOnly
              />
              <span className="m-l-md">{t("Overall rating")}</span>
            </div>
            <div className={`${classes.rating} m-l-md`}>
              {company.avg_salary_valuation}
              <Rating
                name="salary_valuation"
                id="salary_valuation"
                size="small"
                value={`${company.avg_salary_valuation}`}
                precision={0.5}
                readOnly
              />
              <span className="m-l-md">{t("Salary")}</span>
            </div>
            <div className={`${classes.rating} m-l-md`}>
              {company.avg_inhouse_training}
              <Rating
                name="inhouse_training"
                id="inhouse_training"
                size="small"
                value={`${company.avg_inhouse_training}`}
                precision={0.5}
                readOnly
              />
              <span className="m-l-md"> {t("Internal training")}</span>
            </div>
            <div className={`${classes.rating} m-l-md`}>
              {company.avg_growth_opportunities}
              <Rating
                name="growth_opportunities"
                id="growth_opportunities"
                size="small"
                value={`${company.avg_growth_opportunities}`}
                precision={0.5}
                readOnly
              />
              <span className="m-l-md">{t("Growth opportunities")}</span>
            </div>
            <div className={`${classes.rating} m-l-md`}>
              {company.avg_work_enviroment}
              <Rating
                name="work_enviroment"
                id="work_enviroment"
                size="small"
                value={`${company.avg_work_enviroment}`}
                precision={0.5}
                readOnly
              />
              <span className="m-l-md">{t("Work environment")}</span>
            </div>
            <div className={`${classes.rating} m-l-md`}>
              {company.avg_personal_life}
              <Rating
                name="personal_life"
                id="personal_life"
                size="small"
                value={`${company.avg_personal_life}`}
                precision={0.5}
                readOnly
              />
              <span className="m-l-md">{t("Work&Life balance")}</span>
            </div>

            <section>
              <h5 className="m-l-md m-t-xl"> {company.name} </h5>
              <p className="m-l-md">{company.sector}</p>
              <p className="m-l-md">
                <textarea value={company.description} readOnly />
              </p>
              <p className="m-l-md">
                {company.address} - {company.sede_name}
              </p>
              <p className="m-l-md">{company.url_web}</p>
              <p className="m-l-md">{company.linkedin}</p>
            </section>
          </aside>

          <main className="ratingCompany">
            <form onSubmit={handleSubmit(handleCompanySearch)} noValidate>
              <fieldset >
                <legend>
                  <h4>{t("Search for")}</h4>
                </legend>
                <span className="flexRow">
                  <select name="position" id="position" className="m-r-xs" ref={register}>
                    <option value="Empty">&#60;{t("Position")}&#62;</option>
                    {positionsCompany.map(element => (
                      <option key={element.name} value={element.id}>
                        {element.name}
                      </option>
                    ))}
                  </select>
                  <select name="city" id="city" ref={register}>
                    <option value="Empty">&#60;{t("City")}&#62;</option>
                    {companyCities.map(element => (
                      <option key={element.name} value={element.id}>
                        {element.name}
                      </option>
                    ))}
                  </select>
                </span>
              </fieldset>
              <fieldset>
                <legend>
                  <h4>{t("Sort by")}</h4>
                </legend>
                <select name="sort" id="sort" ref={register}>
                  <option value="1">{t("Date")}</option>
                  <option value="2">{t("Overall rating")}</option>
                  <option value="3">{t("Salary")}</option>
                  <option value="4">{t("Internal training")}</option>
                  <option value="5">{t("Growth opportunities")}</option>
                  <option value="6">{t("Work environment")}</option>
                  <option value="7">{t("Work&Life balance")}</option>
                </select>
              </fieldset>
              <button
                type="submit"
                className="btn"
                disabled={formState.isSubmitting}
              >
                {t("Find")}
              </button>
            </form>

            <section>
              <h5>
                {t("Average salary")} {company.avg_salary ? company.avg_salary : "--"} €/{t("month")}
              </h5>
            </section>

            <section>
              <ListReviews
                pathLocation={location.pathname}
                listReviews={reviewsCompanyList}
              />
            </section>
          </main>
        </section>
      </main>
      <Footer />
    </React.Fragment >
  );
}
