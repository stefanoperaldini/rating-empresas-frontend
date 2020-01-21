import React from "react";
import i18n from "i18next";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

/**
 * Page for update data user
 */

export function UserUpdate() {
  return (
    <React.Fragment>
      <Header />
      <main>
        <h2>{i18n.t("This is User Update")}</h2>
      </main>
      < Footer />
    </React.Fragment>
  );
}
