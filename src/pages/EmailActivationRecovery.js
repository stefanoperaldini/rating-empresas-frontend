import React from "react";
import i18n from "i18next";

import { Header } from "../components/Header";

/**
 * Page for recovering email
 */

export function EmailActivationRecovery() {
  return (
    <React.Fragment>
      <Header />
      <main>
        <h2>{i18n.t("This is Email Activation Recovery")}</h2>
      </main>
    </React.Fragment>
  );
}
