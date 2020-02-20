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
          <h1 className="f-s-l">{t("Create your account")}</h1>
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

            <label className="form-control">{t("Name")} (*)
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
            </label>

            <label className="form-control">{t("E-mail")} (*)
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
            </label>

            <label className="form-control">{t("LinkedIn")}
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
            </label>

            <label className="form-control">{t("Password")} (*)
              <input
                ref={register(validatorPassword)}
                name="password"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder={t("Enter your password")}
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
            </label>

            <label className="form-control">{t("Confirm password")} (*)
              <input
                ref={register({
                  validate: value => value === watch("password")
                })}
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder={t("Confirm your password")}
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
            <p className="f-c-fourgray">
              {t("You will receive an activation e-mail")}
            </p>
            <div className="btn-container">
              <button
                type="submit"
                className="m-t-md btn"
                disabled={formState.isSubmitting}
              >
                {t("Create")}
              </button>
              <div className="m-t-md btn-container">
                <Link to="/account/Login">{t("Sign in")}</Link>
              </div>
            </div>
          </form>
        </div>
      </main>
    </React.Fragment>
  );
}
