import React from "react";
import i18n from "i18next";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

/**
 * Page for user reviews
 */

export function ReviewUser() {
  return (
    <React.Fragment>
      <Header />
      <h1>{i18n.t("This is Review User")}</h1>
      <Footer />
    </React.Fragment>
  );
}
