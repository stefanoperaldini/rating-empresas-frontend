import React from "react";
import i18n from "i18next";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import "../css/account-password-change.css";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

/**
 * Page for changing password
 */

export function AccountPasswordChange() {
  // const [backendErrorMessage, setBackendErrorMessage] = useState('')
  const {
    handleSubmit,
    register,
    errors,
    watch,
    formState,
    setError,
    setValue
  } = useForm({
    mode: "onBlur"
  });

  const history = useHistory();

  const handleChangePassword = formData => {
    console.log(formData);
    history.push("/home");
  };

  // console.log('WATCH: ', watch());
  // console.log('ERROR: ', errors);
  // console.log('FORMSTATE: ', formState);

  return (
    <React.Fragment>
      <Header />
      <main className="centered-container">
        <h3>{i18n.t("Change my password")}</h3>
        {/* {backendErrorMessage && !formState.isValid && (
          <p className="alert">
            {backendErrorMessage}
            <span onClick={() => setBackendErrorMessage('')}>close</span>
          </p>
        )} */}
        <form onSubmit={handleSubmit(handleChangePassword)}>
          <div
            className={`form-control ${
              errors.oldPassword ? "ko" : formState.touched.oldPassword && "ok"
            }`}
          >
            <label htmlFor="oldPassword">{i18n.t("Current Password")}</label>
            <input
              ref={register({
                required: "The current password is mandatory",
                pattern: {
                  value: /^[a-zA-Z0-9]{3,36}$/,
                  message: "The password is not valid"
                }
              })}
              name="oldPassword"
              type="password"
              placeholder={i18n.t("Enter your current password")}
            ></input>
            {errors.oldPassword && (
              <span className="errorMessage">
                {i18n.t(errors.oldPassword.message)}
              </span>
            )}
          </div>
          <div
            className={`form-control ${
              errors.newPassword ? "ko" : formState.touched.newPassword && "ok"
            }`}
          >
            <label htmlFor="newPassword">{i18n.t("New Password")}</label>
            <input
              ref={register({
                required: "The new password is mandatory",
                pattern: {
                  value: /^[a-zA-Z0-9]{3,36}$/,
                  message: "The password is not valid"
                }
              })}
              name="newPassword"
              type="password"
              placeholder={i18n.t("Enter your new password")}
            ></input>
            {errors.newPassword && (
              <span className="errorMessage">
                {i18n.t(errors.newPassword.message)}
              </span>
            )}
          </div>
          <div
            className={`form-control ${
              errors.confirmationPassword
                ? "ko"
                : formState.touched.confirmationPassword && "ok"
            }`}
          >
            <label htmlFor="confirmationPassword">
              {i18n.t("Repeat new password")}
            </label>
            <input
              ref={register({
                required: "The new password is mandatory",
                pattern: {
                  value: /^[a-zA-Z0-9]{3,36}$/,
                  message: "The password is not valid"
                }
              })}
              name="confirmationPassword"
              type="password"
              placeholder={i18n.t("Repeat your new password")}
            ></input>
            {errors.confirmationPassword && (
              <span className="errorMessage">
                {i18n.t(errors.confirmationPassword.message)}
              </span>
            )}
          </div>
          <div className="btn-container">
            <button
              type="submit"
              className="btn"
              disabled={formState.isSubmitting}
            >
              {i18n.t("Change")}
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </React.Fragment>
  );
}
