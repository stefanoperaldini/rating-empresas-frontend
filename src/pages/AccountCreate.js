import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Header } from "../components/Header";
import {
  setErrorMessageCallBackEnd,
  validatorEmail,
  validatorPassword,
  validatorLinkedin,
  validatorUserName
} from "./pagesUtils";
import { signUp } from "../http/authService";

export function AccountCreate() {
  const { t } = useTranslation();
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
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleAccountCreate = formData => {
    const formDataFiltered = { ...formData, confirmPassword: undefined };
    return signUp(formDataFiltered)
      .then(response => {
        history.push("/account/login");
      })
      .catch(error => {
        setError("name", "backend", setErrorMessageCallBackEnd(error));
      });
  };

  return (
    <React.Fragment>
      <Header />
      <main className="centered-container">
        <div className="boxAccount">
          <h3>{t("Create your account")}</h3>
          <form onSubmit={handleSubmit(handleAccountCreate)} noValidate>
            <div className="form-control">
              <label>
                <input
                  ref={register}
                  type="radio"
                  name="role"
                  value="1"
                  defaultChecked
                />
                {t("Employee/ex-employee")}
              </label>
              <label>
                <input ref={register} type="radio" name="role" value="2" />
                {t("Company")}
              </label>
            </div>

            <div className="form-control">
              <label htmlFor="name">{t("Name")} (*)</label>
              <input
                ref={register(validatorUserName)}
                name="name"
                id="name"
                type="text"
                placeholder={t("Enter your name")}
              ></input>
              {errors.name && (
                <span className="errorMessage">{t(errors.name.message)}</span>
              )}
            </div>

            <div className="form-control">
              <label htmlFor="email">{t("E-mail")} (*)</label>
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

            <div className="form-control">
              <label htmlFor="linkedin">{t("LinkedIn")}</label>
              <input
                ref={register(validatorLinkedin)}
                name="linkedin"
                id="linkedin"
                type="url"
                placeholder={t("LinkedIn address")}
              ></input>
              {errors.linkedin && (
                <span className="errorMessage">
                  {t(errors.linkedin.message)}
                </span>
              )}
            </div>

            <div className="form-control">
              <label htmlFor="password">{t("Password")} (*)</label>
              <input
                ref={register(validatorPassword)}
                name="password"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder={t("Enter your password")}
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
              {errors.password && (
                <span className="errorMessage">
                  {t(errors.password.message)}
                </span>
              )}
            </div>

            <div className="form-control">
              <label htmlFor="confirmPassword">
                {t("Confirm password")} (*)
              </label>
              <input
                ref={register({
                  validate: value => value === watch("newPassword")
                })}
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder={t("Confirm your password")}
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
            <p>{t("You will receive an activation e-mail")}</p>
            <div className="btn-container">
              <button
                type="submit"
                className="btn"
                disabled={formState.isSubmitting}
              >
                {t("Create")}
              </button>
              <div className="m-t-lg btn-container">
                <Link to="/account/Login">{t("Sign in")}</Link>
              </div>
            </div>
          </form>
        </div>
      </main>
    </React.Fragment>
  );
}
