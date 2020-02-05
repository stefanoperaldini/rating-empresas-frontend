import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import defaultImageCompany from "../img/company-default-small.jpeg";

import { getCompany, getCompanies } from "../http/companyService";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { setErrorMessageCallBackEnd } from "./pagesUtils";

/**
 * Home page
 */

const useStyles = makeStyles({
  rating: {
    width: 200,
    display: "flex",
    alignItems: "center"
  }
});

export function Home() {
  const [topTenList, setTopTenList] = useState([]);
  const { handleSubmit, register, errors, formState, setError } = useForm({
    mode: "onBlur"
  });
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();

  useEffect(() => {
    getCompanies().then(response => {
      setTopTenList(response.data.rows);
    });

    return;
  }, []);

  const handleGetCompanyData = formData => {
    return getCompany(formData.id)
      .then(response => {
        history.push(`/company/detail/${formData.id}`);
      })
      .catch(error => {
        setError("id", "backend", setErrorMessageCallBackEnd(error));
      });
  };

  return (
    <React.Fragment>
      <Header />
      <main>
        <section className="search-reviews">
          <h2>{t("Find great places to work")}</h2>
          <h3>{t("Get access to rating and company reviews")}</h3>
          <form onSubmit={handleSubmit(handleGetCompanyData)}>
            <div
              className={`form-control ${
                errors.id ? "ko" : formState.touched.id && "ok"
              }`}
            >
              <input
                ref={register({
                  required: "Enter a company name",
                  minLength: {
                    value: 3,
                    message: "Minimun is 3 characters"
                  },
                  maxLength: {
                    value: 60,
                    message: "Maximun is 60 characters"
                  }
                })}
                name="id"
                id="search-name"
                type="search"
                placeholder={t("Company name")}
              ></input>
              {errors.id && (
                <span className="errorMessage">{t(errors.id.message)}</span>
              )}
              <div className="btn-container">
                <button
                  type="submit"
                  className="btn"
                  disabled={formState.isSubmitting}
                >
                  {t("Find")}
                </button>
                <div className="m-t-lg btn-container"></div>
              </div>
            </div>
          </form>
          <a href="/advanced-search" title={t("Link to Advanced search page")}>
            {t("Advanced search")}
          </a>
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
        </section>
        <section className="top-companies">
          <h3>{t("Top Ten Workplaces")}</h3>
          <ul className="top-companies">
            {topTenList.map(company => (
              <li key={company.id}>
                <article>
                  <header className="box-header">
                    <p>{company.name}</p>
                  </header>
                  <main>
                    {/* <img class="company-logo"
              src="{company.url_logo}"
              alt={t("Company logo")}> */}
                    <img
                      src={defaultImageCompany}
                      alt={t("Default image company")}
                    />
                    <p>n {t("reviews")}</p>
                    <p> {company.sector}</p>
                    <div className={classes.rating}>
                      <span>{t("Overall rating")}</span>
                      <Rating
                        name={company.name}
                        id={company.name}
                        size="large"
                        value="4"
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
