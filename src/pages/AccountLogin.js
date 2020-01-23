import React, { useState } from 'react';
import i18n from "i18next";
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Header } from "../components/Header";

/**
 * Page for logining
 */

export function AccountLogin() {
  // const [backendErrorMessage, setBackendErrorMessage] = useState('');
  const {
    handleSubmit,
    register,
    errors,
    watch,
    formState,
    setError,
    setValue
  } = useForm({
    mode: 'onBlur'
  });
  const history = useHistory();

  const handleLogin = formData => {
    console.log(formData)
    history.push('/home');
  };

  // console.log('WATCH: ', watch());
  // console.log('ERROR: ', errors);
  // console.log('FORMSTATE: ', formState);

  return (
    <React.Fragment>
      <Header />
      <main className="centered-container">
        <h3>{i18n.t("Please Login")}</h3>
        {/* {backendErrorMessage && !formState.isValid && (
          <p className="alert">
            {backendErrorMessage}
            <span onClick={() => setBackendErrorMessage('')}>close</span>
          </p>
        )} */}
        <form onSubmit={handleSubmit(handleLogin)} noValidate>
          <div
            className={`form-control ${
              errors.email ? 'ko' : formState.touched.email && 'ok'
              }`}
          >
            <label htmlFor="email">{i18n.t("Email")}</label>
            <input
              ref={register({
                required: 'The email is mandatory',
                pattern: {
                  value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'The email is not valid'
                }
              })}
              name="email"
              id="email"
              type="email"
              placeholder={i18n.t("Please enter your email")}
            ></input>
            {errors.email && (
              <span className="errorMessage">{i18n.t(errors.email.message)}</span>
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
          <div className="btn-container">
            <button
              type="submit"
              className="btn"
              disabled={formState.isSubmitting}
            >
              {i18n.t("Login")}
            </button>
            <div className="m-t-lg btn-container">
              <Link to="/account/create">{i18n.t("Sign up")}</Link>
              <Link to="/account/password/recovery">{i18n.t("Forgot password")}</Link>
              <Link to="/email/activation/recovery">{i18n.t("E-mail activation")}</Link>
            </div>
          </div>
        </form>
      </main>
    </React.Fragment>
  );
}
