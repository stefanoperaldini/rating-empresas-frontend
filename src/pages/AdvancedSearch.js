import React from "react";
import i18n from "i18next";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

/**
 * Page advanced search
 */

export function AdvancedSearch() {
  return (
    <React.Fragment>
      <Header />
      <main>
        <h2>{i18n.t("This is Advanced Search")}</h2>
      </main>
      <Footer />
    </React.Fragment>
  );
}
