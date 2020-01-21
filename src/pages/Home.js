import React from "react";
import i18n from "i18next";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

/**
 * Home page
 */

export function Home() {
  return (
    <React.Fragment>
      <Header />
      <h1>{i18n.t("This is the home")}</h1>
      <Footer />
    </React.Fragment>
  );
}
