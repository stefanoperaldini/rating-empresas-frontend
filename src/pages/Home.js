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
import { DotsYellow } from "../components/AppLottie";

/**
 * Home page
 */

export function Home() {
  const [isImageHidden, setIsImageHidden] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [topCompanies, setTopCompanies] = useState(null);
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
        setTopCompanies([]);
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

  useEffect(() => {
    if (isImageHidden) {
      localStorage.setItem("isImageHidden", isImageHidden);
      return;
    }

    const isImageHiddenStored = localStorage.getItem("isImageHidden");
    if (isImageHiddenStored) {
      setIsImageHidden(true);
    }
    return;
  }, [isImageHidden]);

  return (
    <React.Fragment>
      <Header />
      {!isImageHidden ? (
        <main className="page-main">
          <div>
            <h1>{t("Find great places to work")}</h1>
            <p>
              {t(
                "Web portal for rating companies through job reviews carried out by employees or former employees."
              )}{" "}
            </p>
            <p>
              <span
                className="enterBold"
                onClick={() => setIsImageHidden(true)}
              >
                {t("Please, come in...")}
              </span>
            </p>
          </div>
        </main>
      ) : (
        <main className="centered-container-home m-t-md p-r-md p-l-md">
          <section className="allWidth centeredComponent">
            <h1 className="f-s-xxl txtCenter">
              {t("Find great places to work")}
            </h1>
            <p className="f-s-l txtCenter">
              {t("Get access to rating and company reviews")}
            </p>
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
          <section className="allWidth centered-container-home p-t-md">
            {!topCompanies ? (
              <div className="flexRow">
                <DotsYellow />
              </div>
            ) : (
              <React.Fragment>
                <header>
                  <h2 className="f-s-l txtCenter m-b-md">
                    {t("Best regarded workplaces")}
                  </h2>
                </header>
                <ListCompanies
                  className="minWidth"
                  listCompanies={topCompanies}
                />
              </React.Fragment>
            )}
          </section>
        </main>
      )}
      <Footer />
    </React.Fragment>
  );
}
