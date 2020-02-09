import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { passwordChange } from "../http/authService";
import { setErrorMessageCallBackEnd, validatorPassword } from "./pagesUtils";

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
    watch
  } = useForm({
    mode: "onBlur"
  });

  const history = useHistory();
  const { t } = useTranslation();

  const handlePasswordChange = formData => {
    const formDataFiltered = { ...formData, confirmPassword: undefined };
    return passwordChange(formDataFiltered)
      .then(response => {
        history.push("/");
      })
      .catch(error => {
        setError("oldPassword", "backend", setErrorMessageCallBackEnd(error));
      });
  };

  return (
    <React.Fragment>
      <Header />
      <main className="centered-container">
        <div>
          <h3>{t("Change password")}</h3>
          <form onSubmit={handleSubmit(handlePasswordChange)}>
            <div className="form-control">
              <label htmlFor="oldPassword">{t("Current password")}</label>
              <input
                ref={register(validatorPassword)}
                name="oldPassword"
                type="password"
                placeholder={t("Enter current password")}
              ></input>
              {errors.oldPassword && (
                <span className="errorMessage">
                  {t(errors.oldPassword.message)}
                </span>
              )}
            </div>
            <div className="form-control">
              <label htmlFor="newPassword">{t("New password")}</label>
              <input
                ref={register(validatorPassword)}
                name="newPassword"
                type="password"
                placeholder={t("Enter new password")}
              ></input>
              {errors.newPassword && (
                <span className="errorMessage">
                  {t(errors.newPassword.message)}
                </span>
              )}
            </div>

            <div className="form-control">
              <label htmlFor="confirmPassword">
                {t("Confirm new password")}
              </label>
              <input
                ref={register({
                  validate: value => value === watch("newPassword")
                })}
                name="confirmPassword"
                type="password"
                id="confirmPassword"
                placeholder={t("Confirm new password")}
              ></input>
              {errors.confirmPassword && (
                <span className="error-message">
                  {t("The password and the confirmation should match")}
                </span>
              )}
            </div>

            <div className="btn-container">
              <button
                type="submit"
                className="btn"
                disabled={formState.isSubmitting}
              >
                {t("Save")}
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </React.Fragment>
  );
}
