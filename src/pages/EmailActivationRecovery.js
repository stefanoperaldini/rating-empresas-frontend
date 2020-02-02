import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { mailActivationRecovery } from "../http/authService";

import { Header } from "../components/Header";
import { setErrorMessageCallBackEnd, validatorEmail, } from './pagesUtils';

/**
 * Page for recovering email
 */

export function EmailActivationRecovery() {
  // const [backendErrorMessage, setBackendErrorMessage] = useState('')
  const {
    handleSubmit,
    register,
    errors,
    formState,
    setError,
  } = useForm({
    mode: "onBlur"
  });

  const history = useHistory();
  const { t } = useTranslation();

  const handleEmailActivationRecovery = formData => {
    return mailActivationRecovery(formData)
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
        <h3>{t("E-mail activation")}</h3>
        <form onSubmit={handleSubmit(handleEmailActivationRecovery)} noValidate>
          <div
            className={`form-control ${
              errors.email ? "ko" : formState.touched.email && "ok"
              }`}
          >
            <label htmlFor="email">{t("Email")}</label>
            <input ref={register(validatorEmail)} name="email" id="email" type="email"
              placeholder={t("Please enter your email")}>
            </input>
            {errors.email && (
              <span className="errorMessage">
                {t(errors.email.message)}
              </span>
            )}
          </div>

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
      </main>
    </React.Fragment>
  );
}
