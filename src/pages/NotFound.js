import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";

/**
 * Page route not found
 */

export function NotFound() {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <Header className="hiddenHeader" />
      <main className="centered-container">
        <section className="boxAccount">
          <h1>{t("Page not found")}</h1>
          <p>{t("Sorry, we can't find the page you're looking for.")}</p>
          <Link to="/Home">{t("Go back Home")}</Link>
        </section>
      </main>
    </React.Fragment>
  );
}
