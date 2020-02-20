import React, { useState } from "react";
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

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
          <h1 className="f-s-l">{t("Change password")}</h1>
          <form onSubmit={handleSubmit(handlePasswordChange)}>
            <label className="form-control">{t("Current password")} (*)
              <input
                ref={register(validatorPassword)}
                name="oldPassword"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder={t("Enter current password")}
              ></input>
              <span
                className={
                  showPassword ? "password-visible" : "password-invisible"
                }
                onClick={e => {
                  e.preventDefault();
                  setShowPassword(!showPassword);
                }}
              ></span>
              {errors.oldPassword && (
                <span className="errorMessage">
                  {t(errors.oldPassword.message)}
                </span>
              )}
            </label>

            <label className="form-control">{t("New password")} (*)
              <input
                ref={register(validatorPassword)}
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                placeholder={t("Enter new password")}
              ></input>
              <span
                className={
                  showNewPassword ? "password-visible" : "password-invisible"
                }
                onClick={e => {
                  e.preventDefault();
                  setShowNewPassword(!showNewPassword);
                }}
              ></span>
              {errors.newPassword && (
                <span className="errorMessage">
                  {t(errors.newPassword.message)}
                </span>
              )}
            </label>

            <label className="form-control">{t("Confirm new password")} (*)
              <input
                ref={register({
                  validate: value => value === watch("newPassword")
                })}
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder={t("Confirm new password")}
              ></input>
              <span
                className={
                  showConfirmPassword
                    ? "password-visible"
                    : "password-invisible"
                }
                onClick={e => {
                  e.preventDefault();
                  setShowConfirmPassword(!showConfirmPassword);
                }}
              ></span>
              {errors.confirmPassword && (
                <span className="errorMessage">
                  {t("The password and the confirmation should match")}
                </span>
              )}
            </label>
            <p className="f-s-xs m-t-xl">(*) {t("Field required")}</p>
            <div className="btn-container">
              <button
                type="submit"
                className="m-t-md btn"
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
