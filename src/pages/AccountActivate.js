import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { activateAccount } from "../http/authService";
import { setErrorMessageCallBackEnd } from "./pagesUtils";

/**
 * Page for sending activation to backend. Shows the result.
 */

export function AccountActivate() {
  const params = useParams();
  const [response, setResponse] = useState(null);
  const { t } = useTranslation();

  const verificationCode = params.verification_code;

  useEffect(() => {
    activateAccount(verificationCode)
      .then(response => {
        setResponse("Account activated");
      })
      .catch(error => {
        setResponse(setErrorMessageCallBackEnd(error));
      });
  }, [verificationCode, t]);

  if (response === null) {
    return <div>{t("Connecting to the server...")}</div>;
  }

  return (
    <React.Fragment>
      <main className="centered-container">
        <h1>{t(response)}</h1>
        <div className="m-t-md btn-container">
          <Link to="/account/login">{t("Sign in")}</Link>
        </div>
      </main>
    </React.Fragment>
  );
}
