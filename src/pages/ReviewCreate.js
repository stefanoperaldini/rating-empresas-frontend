import React from "react";
import i18n from "i18next";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Cities } from "../components/Cities";

/**
 * Review create
 */

export function ReviewCreate() {

  return (
    <React.Fragment>
      <Header />
      <main className="centered-container">
        <h2>{i18n.t("This is the review create")}</h2>
        <Cities />
      </main>
      <Footer />
    </React.Fragment>
  );
}
