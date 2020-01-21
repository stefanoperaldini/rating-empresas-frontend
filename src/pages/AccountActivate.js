import React from "react";
import i18n from "i18next";

import { Header } from "../components/Header";

/**
 * Page for sending activation to backend. Show the result.
 */

export function AccountActivate() {
  return (
    <React.Fragment>
      <Header />
      <main>
        <h2>{i18n.t("This is Account Activate")}</h2>
      </main>
    </React.Fragment>
  );
}
