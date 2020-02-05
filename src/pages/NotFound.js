import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "../css/notfound.css";

/**
 * Page route not found
 */

export function NotFound() {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <main className="centered-container">
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
