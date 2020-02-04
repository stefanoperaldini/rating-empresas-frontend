import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { passwordChange } from "../http/authService";
import { setErrorMessageCallBackEnd, validatorPassword, } from './pagesUtils';


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
  const { t } = useTranslation();

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
        <h3>{t("Change my password")}</h3>
        <form onSubmit={handleSubmit(handlePasswordChange)}>
          <div
            className={`form-control ${
              errors.oldPassword ? "ko" : formState.touched.oldPassword && "ok"
              }`}
          >
            <label htmlFor="oldPassword">{t("Current Password")}</label>
            <input
              ref={register(validatorPassword)}
              name="oldPassword"
              type="password"
              placeholder={t("Enter your current password")}
            ></input>
            {errors.oldPassword && (
              <span className="errorMessage">
                {t(errors.oldPassword.message)}
              </span>
            )}
          </div>
          <div
            className={`form-control ${
              errors.newPassword ? "ko" : formState.touched.newPassword && "ok"
              }`}
          >
            <label htmlFor="newPassword">{t("New Password")}</label>
            <input
              ref={register(validatorPassword)}
              name="newPassword"
              type="password"
              placeholder={t("Enter your new password")}
            ></input>
            {errors.newPassword && (
              <span className="errorMessage">
                {t(errors.newPassword.message)}
              </span>
            )}
          </div>

          <div
            className={`form-control ${
              errors.confirmPassword ? 'ko' : formState.touched.confirmPassword && 'ok'
              }`}
          >
            <label htmlFor="confirmPassword">{t("Confirm password")}</label>
            <input
              ref={register({
                validate: value => value === watch("newPassword"),
              })}
              name="confirmPassword"
              type="password"
              id="confirmPassword"
              placeholder={t("Please enter your password")}
            ></input>
            {errors.confirmPassword && (
              <span className="error-message">{t("The password and the confirmation should match")}
              </span>
            )}
          </div>

          <div className="btn-container">
            <button
              type="submit"
              className="btn"
              disabled={formState.isSubmitting}
            >
              {t("Change")}
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </React.Fragment>
  );
}
