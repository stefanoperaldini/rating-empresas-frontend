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
        <p>{t("Sorry, we can't find the page you're looking for.")}</p>
        <Link to="/Home">{t("Go back Home")}</Link>
      </main>
    </React.Fragment>
  );
}
