import React from "react";
import i18n from "i18next";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { mailActivationRecovery } from "../http/mailActivRecoveryService";

import "../css/email-activation-recovery.css";
import { Header } from "../components/Header";
import { setErrorMessageCallBackEnd } from './pagesUtils'

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

  const handleEmailActivationRecovery = formData => {
    return mailActivationRecovery(formData)
      .then(response => {
        history.push("/account/login");
      })
      .catch(error => {
        setError("email", "backend", setErrorMessageCallBackEnd(error));
      });
  };

  // console.log('WATCH: ', watch());
  // console.log('ERROR: ', errors);
  // console.log('FORMSTATE: ', formState);

  return (
    <React.Fragment>
      <Header />
      <main className="centered-container">
        <h3>{i18n.t("E-mail activation")}</h3>
        {/* {backendErrorMessage && !formState.isValid && (
          <p className="alert">
            {backendErrorMessage}
            <span onClick={() => setBackendErrorMessage('')}>close</span>
          </p>
        )} */}
        <form onSubmit={handleSubmit(handleEmailActivationRecovery)} noValidate>
          <div
            className={`form-control ${
              errors.email ? "ko" : formState.touched.email && "ok"
              }`}
          >
            <label htmlFor="email">{i18n.t("Email")}</label>
            <input
              ref={register({
                required: "The email is mandatory",
                pattern: {
                  value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "The email is not valid"
                }
              })}
              name="email"
              id="email"
              type="email"
              placeholder={i18n.t("Please enter your email")}
            ></input>
            {errors.email && (
              <span className="errorMessage">
                {i18n.t(errors.email.message)}
              </span>
            )}
          </div>
          <div className="btn-container">
            <button
              type="submit"
              className="btn"
              disabled={formState.isSubmitting}
            >
              {i18n.t("Send")}
            </button>
            <div className="m-t-lg btn-container">
              <Link to="/account/login">{i18n.t("Sign in")}</Link>
            </div>
          </div>
        </form>
      </main>
    </React.Fragment>
  );
}
