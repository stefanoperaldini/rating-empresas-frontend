import React from 'react';
import { useTranslation } from "react-i18next";
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import jwt from "jsonwebtoken";

import { signIn } from '../http/authService';
import { setErrorMessageCallBackEnd } from './pagesUtils'
import { Header } from "../components/Header";
import { useAuth } from '../context/auth-context';

/**
 * Page for logining
 */

export function AccountLogin() {
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
  const { setCurrentUser, setAccessToken, setRole, setCurrentUserId } = useAuth();
  const { t } = useTranslation();

  const handleLogin = formData => {
    return signIn(formData)
      .then(response => {
        setCurrentUser(response.data);
        const userData = jwt.decode(response.data.accessToken)
        setAccessToken(response.data.accessToken);
        setRole(userData.role);
        setCurrentUserId(userData.userId);
        history.push('/home');
      })
      .catch(error => {
        setValue('password', '');
        setError('password', 'backend', setErrorMessageCallBackEnd(error));
      });
  };

  return (
    <React.Fragment>
      <Header />
      <main className="centered-container">
        <h3>{t("Please Login")}</h3>
        <form onSubmit={handleSubmit(handleLogin)} noValidate>
          <div
            className={`form-control ${
              errors.email ? 'ko' : formState.touched.email && 'ok'
              }`}
          >
            <label htmlFor="email">{t("Email")}</label>
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
              placeholder={t("Please enter your email")}
            ></input>
            {errors.email && (
              <span className="errorMessage">{t(errors.email.message)}</span>
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
          <div className="btn-container">
            <button
              type="submit"
              className="btn"
              disabled={formState.isSubmitting}
            >
              {t("Login")}
            </button>
            <div className="m-t-lg btn-container">
              <Link to="/account/create">{t("Sign up")}</Link>
              <Link to="/account/password/recovery">{t("Forgot password")}</Link>
              <Link to="/email/activation/recovery">{t("E-mail activation")}</Link>
            </div>
          </div>
        </form>
      </main>
    </React.Fragment>
  );
}
