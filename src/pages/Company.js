import React from "react";
import i18n from "i18next";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

/**
 * Page company detail
 */

export function Company() {
  return (
    <React.Fragment>
      <Header />
      <h1>{i18n.t("This is the company detail")}</h1>
      <Footer />
    </React.Fragment>
  );
}
