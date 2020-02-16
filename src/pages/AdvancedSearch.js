import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

import { getCompanies, getSectors, getCompaniesCities } from "../http/companyService";
import { getPositions } from "../http/reviewService";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { RateCompanyLink } from "../components/RateCompanyLink";
import { ListCompanies } from "../components/ListCompanies";
import { useAuth } from "../context/auth-context";

/**
 * Page advanced search
 */

export function AdvancedSearch() {
  const { handleSubmit, register, formState, } = useForm({
    mode: "onSubmit"
  });
  const [companiesList, setcompaniesList] = useState([]);
  const [positions, setPositions] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [cities, setCities] = useState([]);

  const { t } = useTranslation();
  const { currentUserId, role } = useAuth();

  const handleAdvancedSearch = formData => {
    let queryString = `sortTipe=${formData.sortTipe}`;
    if (formData.sectorId !== "Empty") {
      queryString = `${queryString}&sectorId=${formData.sectorId}`
    }
    if (formData.positionId !== "Empty") {
      queryString = `${queryString}&positionId=${formData.positionId}`
    }
    if (formData.cityId !== "Empty") {
      queryString = `${queryString}&cityId=${formData.cityId}`
    }
    getCompanies(queryString).then(response => {
      setcompaniesList(response.data.rows_companies);
    }).catch(error => {
      setcompaniesList([]);
    });
  };

  useEffect(() => {
    getCompanies().then(response => {
      setcompaniesList(response.data.rows_companies);
    });
    getPositions().then(response => {
      setPositions(response.data.rows);
    });
    getSectors().then(response => {
      setSectors(response.data.rows);
    });
    getCompaniesCities().then(response => {
      setCities(response.data);
    });
    return;
  }, []);

  return (
    <React.Fragment>
      <Header />
      <main className="centered-container">
        {(!currentUserId || role === "1") && <RateCompanyLink />}
        <h3>{t("Advanced search")}</h3>
        <form onSubmit={handleSubmit(handleAdvancedSearch)} noValidate>
          <fieldset >
            <legend>
              <h4>{t("Search for")}</h4>
            </legend>
            <span className="flexRow">

              <select name="sectorId" id="sectorId" className="m-r-xs" ref={register}>
                <option value="Empty">&#60;{t("Sector")}&#62;</option>
                {sectors.map(element => (
                  <option key={element.sector} value={element.id}>
                    {element.sector}
                  </option>
                ))}
              </select>

              <select name="positionId" id="positionId" className="m-r-xs" ref={register}>
                <option value="Empty">&#60;{t("Position")}&#62;</option>
                {positions.map(element => (
                  <option key={element.name} value={element.id}>
                    {element.name}
                  </option>
                ))}
              </select>
              <select name="cityId" id="cityId" className="m-r-xs" ref={register}>
                <option value="Empty">&#60;{t("City")}&#62;</option>
                {cities.map(element => (
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
            <select name="sortTipe" id="sortTipe" ref={register}>
              <option value="1">{t("Overall rating")}</option>
              <option value="2">{t("Salary")}</option>
              <option value="3">{t("Internal training")}</option>
              <option value="4">{t("Growth opportunities")}</option>
              <option value="5">{t("Work environment")}</option>
              <option value="6">{t("Work&Life balance")}</option>
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
        <section className="allWidth centered-container-home p-t-md m-t-xl">
          <main className="minWidth">
            <ListCompanies listCompanies={companiesList} />
          </main>
        </section>
      </main>
      <Footer />
    </React.Fragment>
  );
}
