import React from "react";
import i18n from "i18next";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Header } from "../components/Header";

/**
 * Page for update data user
 */

export function UserUpdate() {
  // const [backendErrorMessage, setBackendErrorMessage] = useState('')
  const {
    handleSubmit,
    register,
    errors,
    formState,
  } = useForm({
    mode: "onBlur"
  });

  const history = useHistory();

  const handleUserUpdate = formData => {
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
        <h3>{i18n.t("Update my data")}</h3>
        {/* {backendErrorMessage && !formState.isValid && (
          <p className="alert">
            {backendErrorMessage}
            <span onClick={() => setBackendErrorMessage('')}>close</span>
          </p>
        )} */}
        <form onSubmit={handleSubmit(handleUserUpdate)} noValidate>
          <div
            className={`form-control ${
              errors.linkedin ? "ko" : formState.touched.linkedin && "ok"
              }`}
          >
            <label htmlFor="linkedin">{i18n.t("Linkedin")}</label>
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
              placeholder={i18n.t("linkedin address")}
            ></input>
            {errors.linkedin && (
              <span className="errorMessage">
                {i18n.t(errors.linkedin.message)}
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
    </React.Fragment>
  );
}
