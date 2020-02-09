import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";


import { getCompanies } from "../http/companyService";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { setErrorMessageCallBackEnd, validatorCompanyName } from "./pagesUtils";
import { useAuth } from "../context/auth-context";
import defaultImageCompany from "../img/company-default.png";

/**
 * Home page
 */

const useStyles = makeStyles({
  rating: {
    width: "200",
    display: "flex",
    alignItems: "center"
  }
});

export function Home() {
  const [companies, setCompanies] = useState([]);
  const [company, setCompany] = useState("");

  const { handleSubmit, register, errors, formState, setError } = useForm({
    mode: "onBlur"
  });

  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();
  const { currentUserId, role } = useAuth();

  useEffect(() => {
    // FIXME Llamar back con filtro top 10
    getCompanies().then(response => {
      setCompanies(response.data.rows);
    }).catch(error => {
      setError("name", "backend", setErrorMessageCallBackEnd(error));
    });

    return;
  }, [setError]);

  const handleGetCompanyData = formData => {
    let idCompany = null;
    for (let companyItem of companies) {
      if (company === companyItem.name) {
        idCompany = companyItem.id;
        break;
      }
    }
    if (idCompany) {
      history.push(`/company/detail/${idCompany}`);
    } else {
      setError("name", "backend", t("Company not found"));
    }
  }

  return (
    <React.Fragment>
      <Header />
      <main className="centered-container-home">
        <section className="allWidth centeredComponent">
          <h2>{t("Find great places to work")}</h2>
          <p>{t("Get access to rating and company reviews")}</p>
          <form onSubmit={handleSubmit(handleGetCompanyData)}>
            <div className="searchComponent">
              <input
                className="searchCompany"
                list="companyName"
                ref={register(validatorCompanyName)}
                name="name"
                id="name"
                type="text"
                value={company}
                placeholder={t("Company name")}
                onChange={e =>
                  setCompany(e.target.value)
                }
              ></input>
              <datalist id="companyName">
                {companies.map(element => (
                  <option key={element.name} value={element.name}>
                    {element.name}
                  </option>
                ))}
              </datalist>
              {errors.name && (
                <span className="errorMessage">{t(errors.name.message)}</span>
              )}
              <div className="btn-container buttonSearch">
                <button
                  type="submit"
                  className="btn"
                  disabled={formState.isSubmitting}
                >
                  {t("Find")}
                </button>
              </div>
              <a className="advancedSearch" href="/advanced-search" title={t("Link to Advanced search page")}>
                {t("Advanced search")}
              </a>
            </div>
          </form>
        </section>

        {(!currentUserId || role === "1") && (
          <section className="allWidth centeredComponentRate p-t-md m-t-xl">
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

        <section className="allWidth centered-container-home p-t-md m-t-xl">
          <header><h3>{t("Top Ten Workplaces")}</h3></header>
          <main className="minWidth">
            <ul className="containerGrid m-t-lg">
              {companies.map(company => (
                <li key={company.id} className="borderGrey cursorPointer"
                  onClick={e => history.push(`/company/detail/${company.id}`)}>
                  <article className="summaryCompany">
                    <img className="item1"
                      src={defaultImageCompany}
                      alt={t("Default image company")}
                    />
                    <h4>{company.name}</h4>
                    <p> {company.sector}</p>
                    <div className={`${classes.rating} item2 f-s-xs`}>
                      <Rating
                        name={company.name}
                        id={company.name}
                        size="large"
                        value="4"
                        precision={1}
                        readOnly={true}
                        className="m-r-md"
                      />
                      100 {t("reviews")}
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </main>
        </section>
      </main>
      <Footer />
    </React.Fragment >
  );
}
