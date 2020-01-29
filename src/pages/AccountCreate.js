import React from "react";
import i18n from "i18next";
import "../css/account-create.css";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Header } from "../components/Header";
import { setErrorMessageCallBackEnd } from './pagesUtils'
import { signUp } from '../http/authService';

export function AccountCreate() {
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
        setError('linkedin', 'backend', setErrorMessageCallBackEnd(error));
      });
  };

  return (
    <React.Fragment>
      <Header />
      <main className="centered-container">
        <h3>{i18n.t("Create your account")}</h3>
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
              {i18n.t("Employee")}
            </label>
            <label>
              <input
                ref={register}
                type="radio"
                name="role"
                value="2"
              />
              {i18n.t("Company")}
            </label>
          </div>

          <div
            className={`form-control ${
              errors.name ? "ko" : formState.touched.name && "ok"
              }`}
          >
            <label htmlFor="name">{i18n.t("Name")}</label>
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
                {i18n.t(errors.name.message)}
              </span>
            )}
          </div>

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
                },
                maxLength: {
                  value: 45,
                  message: "Maximun is 45 characters"
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

          <div
            className={`form-control ${
              errors.password ? 'ko' : formState.touched.password && 'ok'
              }`}
          >
            <label htmlFor="password">{i18n.t("Password")}</label>
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
              placeholder={i18n.t("Please enter your password")}
            ></input>
            {errors.password && (
              <span className="errorMessage">{i18n.t(errors.password.message)}</span>
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
                validate: value => value === watch("password"),
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

          <div
            className={`form-control ${
              errors.linkedin ? "ko" : formState.touched.linkedin && "ok"
              }`}
          >
            <label htmlFor="linkedin">{i18n.t("Linkedin")}</label>
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
              placeholder={i18n.t("Linkedin address")}
            ></input>
            {errors.linkedin && (
              <span className="errorMessage">
                {i18n.t(errors.linkedin.message)}
              </span>
            )}
          </div>

          <div className="btn-container">
            <button
              type="submit"
              className="btn"
              disabled={formState.isSubmitting}
            >
              {i18n.t("Create Account")}
            </button>
          </div>
        </form>
      </main>
    </React.Fragment >
  );
}
