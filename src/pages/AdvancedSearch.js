import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

import { getCompanies } from "../http/companyService";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { RateCompanyLink } from "../components/RateCompanyLink";
import { ListCompanies } from "../components/ListCompanies";
import { useAuth } from "../context/auth-context";

/**
 * Page advanced search
 */

export function AdvancedSearch() {
  const [companiesList, setcompaniesList] = useState([]);
  const { register } = useForm({
    mode: "onBlur"
  });
  const { t } = useTranslation();
  const { currentUserId, role } = useAuth();

  useEffect(() => {
    getCompanies().then(response => {
      setcompaniesList(response.data.rows);
      console.log(response.data.rows);
    });

    return;
  }, []);

  return (
    <React.Fragment>
      <Header />
      <main className="centered-container">
        {(!currentUserId || role === "1") && <RateCompanyLink />}
        <h3>{t("Advanced search")}</h3>
        <section className="flexRow m-t-lg">
          <h5 className="m-r-md">{t("Search for")}</h5>
          <form onSubmit>
            <ul className="flexRow">
              <li>
                <label className="m-r-xs" htmlFor="sector">
                  {t("Sector")}
                </label>
                <select
                  name="sector"
                  id="sector"
                  ref={register}
                  className="m-r-md"
                >
                  <option value="Empty"></option>
                  <option value="Bank">Bank</option>
                  <option value="Information technology">
                    Information technology
                  </option>
                  <option value="Retail">Retail</option>
                </select>
              </li>
              <li>
                <label className="m-r-xs" htmlFor="position">
                  {t("Job title")}
                </label>
                <select
                  name="position"
                  id="position"
                  ref={register}
                  className="m-r-md"
                >
                  <option value="Empty"></option>
                  <option value="Software developer">Software developer</option>
                  <option value="Project owner">Project owner</option>
                  <option value="Team leader">Team leader</option>
                </select>
              </li>
              <li>
                <label className="m-r-xs" htmlFor="city">
                  {t("City")}
                </label>
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
        <section className="flexRow m-t-lg">
          <h5 className="m-r-md">{t("Sort by")}</h5>
          <ul className="flexRow">
            <li>
              <button className="buttonSort buttonSortLeft buttonBorderRight">
                {t("Overall rating")}
              </button>
            </li>
            <li>
              <button className="buttonSort buttonBorderRight">
                {t("Salary")}
              </button>
            </li>
            <li>
              <button className="buttonSort buttonBorderRight">
                {t("Internal training")}
              </button>
            </li>
            <li>
              <button className="buttonSort buttonBorderRight">
                {t("Growth opportunities")}
              </button>
            </li>
            <li>
              <button className="buttonSort buttonBorderRight">
                {t("Work environment")}
              </button>
            </li>
            <li>
              <button className="buttonSort buttonSortRight">
                {t("Work&Life balance")}
              </button>
            </li>
          </ul>
        </section>
        <section className="allWidth centered-container-home p-t-md m-t-xl">
          <main className="minWidth">
            <ListCompanies listCompanies={companiesList} />
          </main>
          <div>
            <button className="m-r-md">{t("Previous")}</button>
            <button>{t("Next")}</button>
          </div>
        </section>
      </main>
      <Footer />
    </React.Fragment>
  );
}
