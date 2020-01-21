import React from "react";
import i18n from "i18next";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

/**
 * Page for logic delete account
 */

export function UserDelete() {
  return (
    <React.Fragment>
      <Header />
      <main>
        <h2>{i18n.t("This is User Delete")}</h2>
      </main>
      < Footer />
    </React.Fragment>
  );
}
