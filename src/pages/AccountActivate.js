import React from "react";
import i18n from "i18next";
import { Link } from 'react-router-dom';
import { useParams } from "react-router";

/**
 * Page for sending activation to backend. Show the result.
 * http://localhost:3000/account/activate?verification_code=b1d48660-ccf3-4b48-b33f-506d5b790862
 */

export function AccountActivate() {

  const params = useParams();
  console.log(params.verification_code);
  return (
    <React.Fragment>
      <main className="centered-container">
        <h2>{i18n.t("This is Account Activate")}</h2>
        <div className="m-t-lg btn-container">
          <Link to="/account/login">{i18n.t("Login")}</Link>
        </div>
      </main>
    </React.Fragment>
  );
}
