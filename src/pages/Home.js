import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

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
          <h3>{t("Get access to company reviews")}</h3>
          <form onSubmit={handleSubmit(handleGetCompanyData)}>
            <div
              className={`form-control ${
                errors.id ? "ko" : formState.touched.id && "ok"
              }`}
            >
              <label htmlFor="search-name">{t("Company name")}</label>
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
                  {t("Find company")}
                </button>
                <div className="m-t-lg btn-container"></div>
              </div>
            </div>
          </form>
          <a href="/advanced-search" title="Link to Advanced search page">
            {t("Advanced search")}
          </a>
          <h3>
            {t("Do you want to rate a company? Just")}{" "}
            <a href="/account/create" title="Link to sign up page">
              {t("sign up")}
            </a>{" "}
            {t("or")}{" "}
            <a href="/account/login" title="Link to sign in page">
              {t("sign in")}
            </a>
            ! {t("Your reviews will be anonimous")}.
          </h3>
        </section>
        <section className="top-companies">
          <h3>
            {t("Top-Rated Workplaces")}: {t("the Top 10")}
          </h3>
          <ul className="top-companies">
            {topTenList.map(company => (
              <li key={company.id}>
                <article>
                  <header className="box-header">
                    {/* <p>{company.url_logo}</p> */}
                    <p>{company.name}</p>
                  </header>
                  <main>
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
