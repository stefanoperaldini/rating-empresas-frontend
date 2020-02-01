import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';
import { useParams } from "react-router";
import { activateAccount } from '../http/authService';

/**
 * Page for sending activation to backend. Show the result.
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
        let messageResponse = "Server down";
        if (error.response) {
          // Server up
          messageResponse = error.response.data;
          if (error.response.status === "500") {
            messageResponse = "Internal server error";
          }
        }
        setResponse(messageResponse);
      });
  }, [verificationCode]);

  if (response === null) {
    return <div>Connecting to the server ...</div>;
  }

  return (
    <React.Fragment>
      <main className="centered-container">
        <h2>{t(response)}</h2>
        <div className="m-t-lg btn-container">
          <Link to="/account/login">{t("Login")}</Link>
        </div>
      </main>
    </React.Fragment>
  );
}
