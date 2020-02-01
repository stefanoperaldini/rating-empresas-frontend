import React from "react";
import i18n from "i18next";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { passwordChange } from "../http/authService";
import { setErrorMessageCallBackEnd } from './pagesUtils';


/**
 * Page for changing password
 */

export function AccountPasswordChange() {

  const {
    handleSubmit,
    register,
    errors,
    formState,
    setError,
    watch,
  } = useForm({
    mode: "onBlur"
  });

  const history = useHistory();

  const handlePasswordChange = formData => {
    const formDataFiltered = { ...formData, confirmPassword: undefined }
    return passwordChange(formDataFiltered)
      .then(response => {
        history.push('/');
      })
      .catch(error => {
        setError('oldPassword', 'backend', setErrorMessageCallBackEnd(error));
      });
  };

  return (
    <React.Fragment>
      <Header />
      <main className="centered-container">
        <h3>{i18n.t("Change my password")}</h3>
        <form onSubmit={handleSubmit(handlePasswordChange)}>
          <div
            className={`form-control ${
              errors.oldPassword ? "ko" : formState.touched.oldPassword && "ok"
              }`}
          >
            <label htmlFor="oldPassword">{i18n.t("Current Password")}</label>
            <input
              ref={register({
                required: "The current password is mandatory",
                pattern: {
                  value: /^[a-zA-Z0-9]{3,36}$/,
                  message: "The password is not valid"
                }
              })}
              name="oldPassword"
              type="password"
              placeholder={i18n.t("Enter your current password")}
            ></input>
            {errors.oldPassword && (
              <span className="errorMessage">
                {i18n.t(errors.oldPassword.message)}
              </span>
            )}
          </div>
          <div
            className={`form-control ${
              errors.newPassword ? "ko" : formState.touched.newPassword && "ok"
              }`}
          >
            <label htmlFor="newPassword">{i18n.t("New Password")}</label>
            <input
              ref={register({
                required: "The new password is mandatory",
                pattern: {
                  value: /^[a-zA-Z0-9]{3,36}$/,
                  message: "The password is not valid"
                }
              })}
              name="newPassword"
              type="password"
              placeholder={i18n.t("Enter your new password")}
            ></input>
            {errors.newPassword && (
              <span className="errorMessage">
                {i18n.t(errors.newPassword.message)}
              </span>
            )}
          </div>

          <div
            className={`form-control ${
              errors.confirmPassword ? 'ko' : formState.touched.confirmPassword && 'ok'
              }`}
          >
            <label htmlFor="confirmPassword">{i18n.t("Confirm password")}</label>
            <input
              ref={register({
                validate: value => value === watch("newPassword"),
              })}
              name="confirmPassword"
              type="password"
              id="confirmPassword"
              placeholder={i18n.t("Please enter your password")}
            ></input>
            {errors.confirmPassword && (
              <span className="error-message">{i18n.t("The password and the confirmation should match")}
              </span>
            )}
          </div>

          <div className="btn-container">
            <button
              type="submit"
              className="btn"
              disabled={formState.isSubmitting}
            >
              {i18n.t("Change")}
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </React.Fragment>
  );
}
