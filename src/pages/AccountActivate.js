import React, { useEffect, useState } from "react";
import i18n from "i18next";
import { Link } from 'react-router-dom';
import { useParams } from "react-router";
import { activateAccount } from '../http/activationService';

/**
 * Page for sending activation to backend. Show the result.
 */

export function AccountActivate() {
  const params = useParams();
  const [response, setResponse] = useState(null);

  const verificationCode = params.verification_code;

  console.log(params.verification_code);

  useEffect(() => {
    activateAccount(verificationCode)
      .then(response => {
        console.log("Attivato");
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
        console.log("Non attivato")
        setResponse(messageResponse);
      });
  }, [verificationCode]);

  if (response === null) {
    return <div>Connecting to the server ...</div>;
  }

  return (
    <React.Fragment>
      <main className="centered-container">
        <h2>{i18n.t(response)}</h2>
        <div className="m-t-lg btn-container">
          <Link to="/account/login">{i18n.t("Login")}</Link>
        </div>
      </main>
    </React.Fragment>
  );
}
