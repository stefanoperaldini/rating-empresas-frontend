import React from "react";
import i18n from "i18next";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

/**
 * Page for changing password
 */

export function AccountPasswordChange() {
  return (
    <React.Fragment>
      <Header />
      <main>
        <h2>{i18n.t("This is Account Password Change")}</h2>
      </main>
      <Footer />
    </React.Fragment>
  );
}
