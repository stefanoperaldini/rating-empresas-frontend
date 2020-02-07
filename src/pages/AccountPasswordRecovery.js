import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { passwordRecovery } from "../http/authService";
import { Header } from "../components/Header";
import { setErrorMessageCallBackEnd, validatorEmail } from "./pagesUtils";

/**
 * Page for recovering password
 */

export function AccountPasswordRecovery() {
  const { handleSubmit, register, errors, formState, setError } = useForm({
    mode: "onBlur"
  });

  const history = useHistory();
  const { t } = useTranslation();

  const handleRecoveryPassword = formData => {
    return passwordRecovery(formData)
      .then(response => {
        history.push("/account/login");
      })
      .catch(error => {
        setError("email", "backend", setErrorMessageCallBackEnd(error));
      });
  };

  return (
    <React.Fragment>
      <Header />
      <main className="centered-container">
        <div className="boxAccount">
          <h3>{t("Forgot password?")}</h3>
          <form onSubmit={handleSubmit(handleRecoveryPassword)} noValidate>
            <div className="form-control">
              <label htmlFor="email">{t("E-mail")}</label>
              <input
                ref={register(validatorEmail)}
                name="email"
                id="email"
                type="email"
                placeholder={t("Enter your e-mail")}
              ></input>
              {errors.email && (
                <span className="errorMessage">{t(errors.email.message)}</span>
              )}
            </div>
            <p>{t("We will send you an e-mail with a new password")}</p>
            <div className="btn-container">
              <button
                type="submit"
                className="btn"
                disabled={formState.isSubmitting}
              >
                {t("Send")}
              </button>
              <div className="m-t-lg btn-container">
                <Link to="/account/login">{t("Sign in")}</Link>
              </div>
            </div>
          </form>
        </div>
      </main>
    </React.Fragment>
  );
}
