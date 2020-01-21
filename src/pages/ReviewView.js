import React from "react";
import i18n from "i18next";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

/**
 * Page for view a review (admin can delete a review)
 */

export function ReviewView() {
  return (
    <React.Fragment>
      <Header />
      <h1>{i18n.t("This is Review View")}</h1>
      <Footer />
    </React.Fragment>
  );
}
