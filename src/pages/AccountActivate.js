import React from "react";
import i18n from "i18next";

/**
 * Page for sending activation to backend. Show the result.
 */

export function AccountActivate() {
  return (
    <div>
      <h1>{i18n.t("This is Account Activate")}</h1>
    </div>
  );
}
