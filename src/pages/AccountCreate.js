import React from "react";
import { useTranslation } from "react-i18next";

import "../css/account-create.css";
import { Link, useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";

import { Header } from "../components/Header";
import { setErrorMessageCallBackEnd } from './pagesUtils';
import { signUp } from '../http/authService';

export function AccountCreate() {
  const { t } = useTranslation();
  const { handleSubmit, register, errors, watch, formState, setError, } = useForm({
    mode: "onBlur"
  });
  const history = useHistory();

  const handleAccountCreate = formData => {
    const formDataFiltered = { ...formData, confirmPassword: undefined }
    return signUp(formDataFiltered)
      .then(response => {
        history.push('/account/login');
      })
      .catch(error => {
        setError('name', 'backend', setErrorMessageCallBackEnd(error));
      });
  };

  return (
    <React.Fragment>
      <Header />
      <main className="centered-container">
        <h3>{t("Create your account")}</h3>
        <form onSubmit={handleSubmit(handleAccountCreate)} noValidate>
          <div className="flexRow">
            <label>
              <input
                ref={register}
                type="radio"
                name="role"
                value="1"
                defaultChecked
              />
              {t("Employee")}
            </label>
            <label>
              <input
                ref={register}
                type="radio"
                name="role"
                value="2"
              />
              {t("Company")}
            </label>
          </div>

          <div
            className={`form-control ${
              errors.name ? "ko" : formState.touched.name && "ok"
              }`}
          >
            <label htmlFor="name">{t("Name")}</label>
            <input
              ref={register({
                required: "The name is mandatory",
                maxLength: {
                  value: 45,
                  message: "Maximun is 45 characters"
                }
              })}
              name="name"
              id="name"
              type="text"
              placeholder="Please enter your name"
            ></input>
            {errors.name && (
              <span className="errorMessage">
                {t(errors.name.message)}
              </span>
            )}
          </div>

          <div
            className={`form-control ${
              errors.email ? "ko" : formState.touched.email && "ok"
              }`}
          >
            <label htmlFor="email">{t("Email")}</label>
            <input
              ref={register({
                required: "The email is mandatory",
                pattern: {
                  value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "The email is not valid"
                },
                maxLength: {
                  value: 45,
                  message: "Maximun is 45 characters"
                }
              })}
              name="email"
              id="email"
              type="email"
              placeholder={t("Please enter your email")}
            ></input>
            {errors.email && (
              <span className="errorMessage">
                {t(errors.email.message)}
              </span>
            )}
          </div>

          <div
            className={`form-control ${
              errors.linkedin ? "ko" : formState.touched.linkedin && "ok"
              }`}
          >
            <label htmlFor="linkedin">{t("Linkedin")}</label>
            <input
              ref={register({
                pattern: {
                  value: /^https:\/\/[a-z]{2,3}\.linkedin\.com\/.*$/,
                  message: "The linkedin address is not valid"
                }
              })}
              name="linkedin"
              id="linkedin"
              type="url"
              placeholder={t("Linkedin address")}
            ></input>
            {errors.linkedin && (
              <span className="errorMessage">
                {t(errors.linkedin.message)}
              </span>
            )}
          </div>

          <div
            className={`form-control ${
              errors.password ? 'ko' : formState.touched.password && 'ok'
              }`}
          >
            <label htmlFor="password">{t("Password")}</label>
            <input
              ref={register({
                required: 'The password is mandatory',
                pattern: {
                  value: /^[a-zA-Z0-9]{3,36}$/,
                  message: 'The password is not valid'
                }
              })}
              name="password"
              type="password"
              id="password"
              placeholder={t("Please enter your password")}
            ></input>
            {errors.password && (
              <span className="errorMessage">{t(errors.password.message)}</span>
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
                validate: value => value === watch("password"),
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
              {t("Create Account")}
            </button>
            <div className="m-t-lg btn-container">
              <Link to="/account/Login">{t("Login")}</Link>
            </div>
          </div>
        </form>
      </main>
    </React.Fragment >
  );
}
