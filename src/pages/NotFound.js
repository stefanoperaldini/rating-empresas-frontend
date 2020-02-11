import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

/**
 * Page route not found
 */

export function NotFound() {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <main className="centered-container">
        <p className="boxAccount">
          <h2>{t("Page not found")}</h2>
          <span>{t("Sorry, we can't find the page you're looking for.")}</span>
          <Link to="/Home">{t("Go back Home")}</Link>
        </p>
      </main>
    </React.Fragment>
  );
}
