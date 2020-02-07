import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";

import { getCompanies } from "../http/companyService";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

/**
 * Page advanced search
 */

const useStyles = makeStyles({
  rating: {
    width: 200,
    display: "flex",
    alignItems: "center"
  }
});

export function AdvancedSearch() {
  const [companiesList, setcompaniesList] = useState([]);
  const { register } = useForm({
    mode: "onBlur"
  });
  const classes = useStyles();
  const { t } = useTranslation();

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
        <h3>{t("Advanced search")}</h3>
        <section>
          <h5>{t("Search for")}:</h5>
          <form onSubmit>
            <ul>
              <li>
                <label htmlFor="sector">{t("Sector")}</label>
                <select name="sector" id="sector" ref={register}>
                  <option value="Empty"></option>
                  <option value="Bank">Bank</option>
                  <option value="Information technology">
                    Information technology
                  </option>
                  <option value="Retail">Retail</option>
                </select>
              </li>
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
        <section>
          <div>
            <button>{t("Overall rating")}</button>
          </div>
          <div>
            <button>{t("Salary")}</button>
          </div>
          <div>
            <button>{t("Internal training")}</button>
          </div>
          <div>
            <button>{t("Growth opportunities")}</button>
          </div>
          <div>
            <button>{t("Work environment")}</button>
          </div>
          <div>
            <button>{t("Work&Life balance")}</button>
          </div>
        </section>
        <section>
          <ul>
            {companiesList.map(company => (
              <li key={company.id}>
                <article>
                  <header>
                    <p>{company.url_logo}</p>
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

          <div>
            <button>{t("Previous")}</button>
            <button>{t("Next")}</button>
          </div>
        </section>
      </main>
      <Footer />
    </React.Fragment>
  );
}
