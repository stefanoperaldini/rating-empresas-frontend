import React from "react";
import i18n from "i18next";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import "../css/account-password-change.css";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { setErrorMessageCallBackEnd } from "./pagesUtils";
import { deleteUser } from "../http/deleteUserService";

/**
 * Page for logic delete account
 */

export function UserDelete() {
  const { handleSubmit, register, errors, formState, setError } = useForm({
    mode: "onBlur"
  });
  const history = useHistory();

  const handleUserDelete = formData => {
    console.log(formData);
    return deleteUser(formData)
      .then(response => {
        history.push("/home");
      })
      .catch(error => {
        setError("backend", setErrorMessageCallBackEnd(error));
      });
  };

  return (
    <React.Fragment>
      <Header />
      <main className="centered-container">
        <h3>{i18n.t("Delete my account")}</h3>
        <form onSubmit={handleSubmit(handleUserDelete)}>
          <div
            className={`form-control ${
              errors.confirm ? "ko" : formState.touched.confirm && "ok"
            }`}
          >
            <label htmlFor="confirm">
              {i18n.t("For deleting your account, please type")}: CONFIRM DELETE
            </label>
            <input
              ref={register({
                required: "This field is mandatory",
                pattern: {
                  value: /CONFIRM DELETE/,
                  message: "Must type CONFIRM DELETE"
                }
              })}
              name="confirm"
              type="text"
              id="confirm"
              placeholder={i18n.t("CONFIRM DELETE")}
            ></input>
            {errors.confirm && (
              <span className="errorMessage">
                {i18n.t(errors.confirm.message)}
              </span>
            )}
          </div>
          <div className="btn-container">
            <button
              type="submit"
              className="btn"
              disabled={formState.isSubmitting}
            >
              {i18n.t("Send delete request")}
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </React.Fragment>
  );
}
