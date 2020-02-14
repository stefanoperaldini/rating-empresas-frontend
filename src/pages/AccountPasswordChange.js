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

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
          <h3>{t("Change password")}</h3>
          <form onSubmit={handleSubmit(handlePasswordChange)}>
            <div className="form-control">
              <label htmlFor="oldPassword">{t("Current password")} (*)</label>
              <input
                ref={register(validatorPassword)}
                name="oldPassword"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder={t("Enter current password")}
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                }}
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
            </div>
            <div className="form-control">
              <label htmlFor="newPassword">{t("New password")} (*)</label>
              <input
                ref={register(validatorPassword)}
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                placeholder={t("Enter new password")}
                value={newPassword}
                onChange={e => {
                  setNewPassword(e.target.value);
                }}
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
            </div>

            <div className="form-control">
              <label htmlFor="confirmPassword">
                {t("Confirm new password")} (*)
              </label>
              <input
                ref={register({
                  validate: value => value === watch("newPassword")
                })}
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder={t("Confirm new password")}
                value={confirmPassword}
                onChange={e => {
                  setConfirmPassword(e.target.value);
                }}
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
            </div>
            <p>(*) {t("Field required")}</p>
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
