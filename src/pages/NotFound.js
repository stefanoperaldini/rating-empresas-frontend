import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import notfound from "../img/notfound.jpeg";
import "../css/notfound.css";

/**
 * Page route not founded
 */

export function NotFound() {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <main className="centered-container">
        <aside>
          <img src={notfound} alt="page not found" />
        </aside>
        <h2>{t("Page not found")}</h2>
        <p>
          {" "}
          {t(
            "Something went wrong and we cant find the page you are looking for."
          )}{" "}
        </p>
        <Link to="/Home">{t("Home")}</Link>
      </main>
    </React.Fragment>
  );
}
