import React, { useState } from 'react';
import i18n from "i18next";
import jwt from "jsonwebtoken"
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { signIn } from '../http/authService';
import { useAuth } from '../context/auth-context';

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
    formState,
    setError,
    setValue
  } = useForm({
    mode: 'onBlur'
  });
  const history = useHistory();
  const { setAccessToken, setRole, setCurrentUserId } = useAuth();

  const handleLogin = formData => {
    return signIn(formData)
      .then(response => {
        const userData = jwt.decode(response.data.accessToken);
        setAccessToken(response.data.accessToken);
        setRole(userData.role)
        setCurrentUserId(userData.userId);
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('role', userData.role);
        localStorage.setItem('userId', userData.userId);
        history.push('/home');
      })
      .catch(error => {
        setValue('password', '');
        let messageResponse = "Server down";
        if (error.response) {
          // Server up
          messageResponse = error.response.data;
          if (error.response.status === "500") {
            messageResponse = "Internal server error";
          }
        }
        setError('password', 'backend', messageResponse);
      });
  };

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
