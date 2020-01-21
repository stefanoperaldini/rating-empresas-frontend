import React from "react";
import i18n from "i18next";

import { Header } from "../components/Header";

/**
 * Page for logining
 */

export function AccountLogin() {
  return (
    <React.Fragment>
      <Header />
      <main>
        <h2>{i18n.t("This is Account Login")}</h2>
      </main>
    </React.Fragment>
  );
}
