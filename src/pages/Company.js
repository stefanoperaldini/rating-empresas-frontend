import React from "react";
import { useTranslation } from "react-i18next";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

/**
 * Page company detail
 */

export function Company() {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <Header />
      <main className="centered-container">
        <h2>{t("This is the company detail")}</h2>
      </main>
      <Footer />
    </React.Fragment>
  );
}
