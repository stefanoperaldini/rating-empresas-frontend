import React from "react";
import i18n from "i18next";

import { Header } from "../components/Header";

/**
 * Page for creating a account 
 */

export function AccountCreate() {
  return (
    <React.Fragment>
      <Header />
      <main>
        <h2>{i18n.t("This is Account Create")}</h2>
      </main>
    </React.Fragment>
  );
}
