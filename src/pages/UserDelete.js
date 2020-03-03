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
        <div className="boxAccount">
          <h1 className="f-s-l">{t("Delete account")}</h1>
          <form onSubmit={handleSubmit(handleUserDelete)}>
            <label className="form-control">
              {t("For deleting your account, please type")}: CONFIRM DELETE
              <input
                ref={register(validatorDelete)}
                name="confirm"
                type="text"
                id="confirm"
                placeholder={t("CONFIRM DELETE")}
              ></input>
              {errors.confirm && (
                <span className="errorMessage">
                  {t(errors.confirm.message)}
                </span>
              )}
            </label>
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
        </div>
      </main>
      <Footer />
    </React.Fragment>
  );
}
