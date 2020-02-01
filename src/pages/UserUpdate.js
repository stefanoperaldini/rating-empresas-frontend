import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { setErrorMessageCallBackEnd } from "./pagesUtils";
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

  const [linkedinUser, setlinkedinUser] = useState(null);

  useEffect(() => {
    getUser()
      .then(response => {
        setlinkedinUser(response.data.linkedin);
      })
      .catch(error => {
        setError("linkedin", "backend", setErrorMessageCallBackEnd(error));
      });
    return;
  }, []);

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
        <h3>{t("Update my data")}</h3>
        <form onSubmit={handleSubmit(handleLinkedinChange)} noValidate>
          <div
            className={`form-control ${
              errors.linkedin ? "ko" : formState.touched.linkedin && "ok"
              }`}
          >
            <label htmlFor="linkedin">{t("Linkedin")}</label>
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
              value={linkedinUser}
              onChange={e => setlinkedinUser(e.target.value)}
            ></input>
            {errors.linkedin && (
              <span className="errorMessage">
                {t(errors.linkedin.message)}
              </span>
            )}
          </div>
          <div className="btn-container">
            <button
              type="submit"
              className="btn"
              disabled={formState.isSubmitting}
            >
              {t("Change")}
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </React.Fragment>
  );
}
