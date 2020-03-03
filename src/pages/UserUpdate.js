import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { setErrorMessageCallBackEnd, validatorLinkedin } from "./pagesUtils";
import { getUser, updateUser } from "../http/userService";

/**
 * Page for update data user
 */

export function UserUpdate() {
  const { handleSubmit, register, errors, formState, setError } = useForm({
    mode: "onBlur"
  });
  const history = useHistory();
  const { t } = useTranslation();
  const [linkedinUser, setlinkedinUser] = useState("");

  useEffect(() => {
    getUser()
      .then(response => {
        response.data.linkedin
          ? setlinkedinUser(response.data.linkedin)
          : setlinkedinUser("");
      })
      .catch(error => {
        setError("linkedin", "backend", setErrorMessageCallBackEnd(error));
      });
    return;
  }, [setError]);

  const handleLinkedinChange = formData => {
    return updateUser(formData)
      .then(response => {
        history.push("/");
      })
      .catch(error => {
        setError("linkedin", "backend", setErrorMessageCallBackEnd(error));
      });
  };

  return (
    <React.Fragment>
      <Header />
      <main className="centered-container">
        <div className="boxAccount">
          <h1 className="f-s-l">{t("Update profile")}</h1>
          <form
            className="linkedIn"
            onSubmit={handleSubmit(handleLinkedinChange)}
            noValidate
          >
            <label className="form-control">
              {t("LinkedIn")}
              <input
                ref={register(validatorLinkedin)}
                name="linkedin"
                id="linkedin"
                type="url"
                value={linkedinUser}
                onChange={e => setlinkedinUser(e.target.value)}
              ></input>
              {errors.linkedin && (
                <span className="errorMessage">
                  {t(errors.linkedin.message)}
                </span>
              )}
            </label>
            <div className="btn-container">
              <button
                type="submit"
                className="btn"
                disabled={formState.isSubmitting}
              >
                {t("Save")}
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </React.Fragment>
  );
}
