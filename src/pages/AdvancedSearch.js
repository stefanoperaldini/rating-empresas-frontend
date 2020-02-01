import React from "react";
import { useTranslation } from "react-i18next";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

/**
 * Page advanced search
 */

export function AdvancedSearch() {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <Header />
      <main className="centered-container">
        <h2>{t("This is Advanced Search")}</h2>
      </main>
      <Footer />
    </React.Fragment>
  );
}
