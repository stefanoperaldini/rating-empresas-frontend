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
  const [company, setCompany] = useState("");

  const { handleSubmit, register, errors, formState, setError } = useForm({
    mode: "onBlur"
  });

  const { t } = useTranslation();
  const history = useHistory();
  const { currentUserId, role } = useAuth();

  useEffect(() => {
    // FIXME Llamar back con filtro top 10
    getCompanies()
      .then(response => {
        setCompanies(response.data.rows);
      })
      .catch(error => {
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
  };

  return (
    <React.Fragment>
      <Header />
      <main className="centered-container-home">
        <section className="allWidth centeredComponent">
          <h2>{t("Find great places to work")}</h2>
          <p>{t("Get access to rating and company reviews")}</p>
          <form onSubmit={handleSubmit(handleGetCompanyData)}>
            <div className="searchComponent">
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
            <h3>{t("Top Ten Workplaces")}</h3>
          </header>
          <main className="minWidth">
            <ListCompanies listCompanies={companies} />
          </main>
        </section>
      </main>
      <Footer />
    </React.Fragment>
  );
}
