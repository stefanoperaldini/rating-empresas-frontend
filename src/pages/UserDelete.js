import React from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { setErrorMessageCallBackEnd, validatorDelete } from "./pagesUtils";
import { deleteUser } from "../http/userService";

/**
 * Page for logic delete account
 */

export function UserDelete() {
  const { handleSubmit, register, errors, formState, setError } = useForm({
    mode: "onBlur"
  });
  const history = useHistory();
  const { t } = useTranslation();

  const handleUserDelete = formData => {
    return deleteUser(formData)
      .then(response => {
        history.push("/home");
      })
      .catch(error => {
        setError("confirm", "backend", setErrorMessageCallBackEnd(error));
      });
  };

  return (
    <React.Fragment>
      <Header />
      <main className="centered-container">
        <h3>{t("Delete account")}</h3>
        <form onSubmit={handleSubmit(handleUserDelete)}>
          <div className="form-control">
            <label htmlFor="confirm">
              {t("For deleting your account, please type")}: CONFIRM DELETE
            </label>
            <input
              ref={register(validatorDelete)}
              name="confirm"
              type="text"
              id="confirm"
              placeholder={t("CONFIRM DELETE")}
            ></input>
            {errors.confirm && (
              <span className="errorMessage">{t(errors.confirm.message)}</span>
            )}
          </div>

          <div className="btn-container">
            <button
              type="submit"
              className="btn"
              disabled={formState.isSubmitting}
            >
              {t("Delete")}
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </React.Fragment>
  );
}
