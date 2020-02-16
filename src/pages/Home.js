import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import { getCompanies } from "../http/companyService";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { RateCompanyLink } from "../components/RateCompanyLink";
import { setErrorMessageCallBackEnd, validatorCompanyName } from "./pagesUtils";
import { useAuth } from "../context/auth-context";
import { ListCompanies } from "../components/ListCompanies";
import searchingImgSvg from "../img/imageHome.svg";

/**
 * Home page
 */

export function Home() {
  const [companies, setCompanies] = useState([]);
  const [topCompanies, setTopCompanies] = useState([]);
  const [company, setCompany] = useState("");

  const { handleSubmit, register, errors, formState, setError } = useForm({
    mode: "onBlur"
  });

  const { t } = useTranslation();
  const history = useHistory();
  const { currentUserId, role } = useAuth();

  useEffect(() => {
    getCompanies(`sortTipe=7`)
      .then(response => {
        setCompanies(response.data.rows_companies);
      })
      .catch(error => {
        setError("name", "backend", setErrorMessageCallBackEnd(error));
      });

    getCompanies(`sortTipe=1&page=1&row4page=10`)
      .then(response => {
        setTopCompanies(response.data.rows_companies);
      })
      .catch(error => {
        setError("name", "backend", setErrorMessageCallBackEnd(error));
      });

    return;
  }, [setError]);

  const handleGetCompanyData = formData => {
    let idCompany = null;
    for (let companyItem of companies) {
      if (company.toUpperCase() === companyItem.name.toUpperCase()) {
        idCompany = companyItem.company_id;
        break;
      }
    }
    if (idCompany) {
      history.push(`/company/detail/${idCompany}`);
    } else {
      setError("name", "backend", t("Company not found"));
    }
  };

  return (
    <React.Fragment>
      <Header />
      <main className="centered-container-home">
        <section className="allWidth centeredComponent">
          <h1 className="f-s-xxl">{t("Find great places to work")}</h1>
          <p className="f-s-m">
            {t("Get access to rating and company reviews")}
          </p>
          <form onSubmit={handleSubmit(handleGetCompanyData)}>
            <div className="searchComponent m-t-xl">
              <img
                className="imageHome"
                src={searchingImgSvg}
                alt={t("Person searching with a flashlight")}
              />
              <input
                className="searchCompany"
                list="companyName"
                ref={register(validatorCompanyName)}
                name="name"
                id="name"
                type="text"
                value={company}
                placeholder={t("Company name")}
                onChange={e => setCompany(e.target.value)}
              ></input>
              <datalist id="companyName">
                {companies.map(element => (
                  <option key={element.name} value={element.name}>
                    {element.name}
                  </option>
                ))}
              </datalist>
              {errors.name && (
                <span className="errorMessageCompany">
                  {t(errors.name.message)}
                </span>
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
              <a
                className="advancedSearch"
                href="/advanced-search"
                title={t("Link to Advanced search page")}
              >
                {t("Advanced search")}
              </a>
            </div>
          </form>
        </section>

        {(!currentUserId || role === "1") && <RateCompanyLink />}

        <section className="allWidth centered-container-home p-t-md m-t-xl">
          <header>
            <h2 className="f-s-l">{t("Top Ten Workplaces")}</h2>
          </header>
          <main className="minWidth">
            <ListCompanies listCompanies={topCompanies} />
          </main>
        </section>
      </main>
      <Footer />
    </React.Fragment>
  );
}
