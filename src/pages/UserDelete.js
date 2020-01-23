import React from "react";
import i18n from "i18next";
import "../css/account-create.css";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

/**
 * Page for logic delete account
 */

export function UserDelete() {
  const { handleSubmit, register, errors, formState } = useForm({
    mode: "onBlur"
  });
  const history = useHistory();

  const handleLogin = formData => {
    console.log(formData);
    history.push("/home");
  };
  return (
    <React.Fragment>
      <Header />
      <main className="centered-container">
        <h2>{i18n.t("Delete your account")}</h2>
        <div className="warning">
          <p>
            {i18n.t(
              "are you sure you wish to delete your account? you will not be able to create any new reviews, but any reviews you have made will remain on the site."
            )}
          </p>
        </div>

        <form onSubmit={handleSubmit(handleLogin)} noValidate>
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
              errors.password ? "ko" : formState.touched.password && "ok"
            }`}
          >
            <label htmlFor="password">{i18n.t("Password")}</label>
            <input
              ref={register({
                required: "The password is mandatory",
                pattern: {
                  value: /^[a-zA-Z0-9]{3,36}$/,
                  message: "The password is not valid"
                }
              })}
              name="password"
              type="password"
              id="password"
              placeholder={i18n.t("Please enter your password")}
            ></input>
            {errors.password && (
              <span className="errorMessage">
                {i18n.t(errors.password.message)}
              </span>
            )}
          </div>
          <div className="btn-container">
            <button
              type="submit"
              className="btn"
              disabled={formState.isSubmitting}
            >
              {i18n.t("Delete")}
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </React.Fragment>
  );
}
