import React from "react";
import i18n from "i18next";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createCompany } from "../http/createCompanyService";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

/**
 * Page for create company
 */

export function CompanyCreate() {
  // const [backendErrorMessage, setBackendErrorMessage] = useState('')
  const {
    handleSubmit,
    register,
    errors,
    formState,
    setError,
    setValue
  } = useForm({
    mode: "onBlur"
  });

  const history = useHistory();

  const handleCompanyCreate = formData => {
    console.log(formData);
    return createCompany(formData)
      .then(response => {
        history.push("/home");
      })
      .catch(error => {
        setValue("linkedin", "");
        let messageResponse = "Server down";
        if (error.response) {
          // Server up
          messageResponse = error.response.data;
          if (error.response.status === "500") {
            messageResponse = "Internal server error";
          }
        }
        setError("linkedin", "backend", messageResponse);
      });
  };

  // console.log('WATCH: ', watch());
  // console.log('ERROR: ', errors);
  // console.log('FORMSTATE: ', formState);

  return (
    <React.Fragment>
      <Header />
      <main className="centered-container scroll">
        <h3>{i18n.t("My company")}</h3>
        {/* {backendErrorMessage && !formState.isValid && (
          <p className="alert">
            {backendErrorMessage}
            <span onClick={() => setBackendErrorMessage('')}>close</span>
          </p>
        )} */}
        <form onSubmit={handleSubmit(handleCompanyCreate)} noValidate>
          <div
            className={`form-control ${
              errors.name ? "ko" : formState.touched.name && "ok"
              }`}
          >
            <label htmlFor="name">{i18n.t("Name")}</label>
            <input
              ref={register({
                required: "Company name is mandatory",
                minLength: {
                  value: 3,
                  message: "Minimun is 3 characters"
                },
                maxLength: {
                  value: 60,
                  message: "Maximun is 60 characters"
                }
              })}
              name="name"
              id="name"
              type="text"
              placeholder={i18n.t("My company name")}
            ></input>
            {errors.name && (
              <span className="errorMessage">
                {i18n.t(errors.name.message)}
              </span>
            )}
          </div>
          <div
            className={`form-control ${
              errors.description ? "ko" : formState.touched.description && "ok"
              }`}
          >
            <label htmlFor="description">{i18n.t("Description")}</label>
            <input
              ref={register({
                minLength: {
                  value: 10,
                  message: "Minimun is 10 characters"
                },
                maxLength: {
                  value: 1000,
                  message: "Maximun is 1000 characters"
                }
              })}
              name="description"
              id="description"
              type="textarea"
              placeholder={i18n.t("About my company")}
            ></input>
            {errors.description && (
              <span className="errorMessage">
                {i18n.t(errors.description.message)}
              </span>
            )}
          </div>
          <div
            className={`form-control ${
              errors.sector_id ? "ko" : formState.touched.sector_id && "ok"
              }`}
          >
            <label htmlFor="sector_id">{i18n.t("Sector")}</label>
            <input
              ref={register({
                required: "Sector is mandatory"
              })}
              name="sector_id"
              id="sector_id"
              type="text"
              placeholder={i18n.t("My company's sector")}
            ></input>
            {errors.sector_id && (
              <span className="errorMessage">
                {i18n.t(errors.sector_id.message)}
              </span>
            )}
          </div>
          <div
            className={`form-control ${
              errors.url_web ? "ko" : formState.touched.url_web && "ok"
              }`}
          >
            <label htmlFor="url_web">{i18n.t("URL")}</label>
            <input
              ref={register({
                pattern: {
                  value: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
                  message: "The URL is not valid"
                }
              })}
              name="url_web"
              id="url_web"
              type="url"
              placeholder={i18n.t("Website")}
            ></input>
            {errors.url_web && (
              <span className="errorMessage">
                {i18n.t(errors.url_web.message)}
              </span>
            )}
          </div>
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
          <div
            className={`form-control ${
              errors.address ? "ko" : formState.touched.address && "ok"
              }`}
          >
            <label htmlFor="address">{i18n.t("Address")}</label>
            <input
              ref={register({
                minLength: {
                  value: 10,
                  message: "Minimun is 10 characters"
                },
                maxLength: {
                  value: 60,
                  message: "Maximun is 60 characters"
                }
              })}
              name="address"
              id="address"
              type="text"
              placeholder={i18n.t("Headquarters address")}
            ></input>
            {errors.address && (
              <span className="errorMessage">
                {i18n.t(errors.address.message)}
              </span>
            )}
          </div>
          <div
            className={`form-control ${
              errors.sede_id ? "ko" : formState.touched.sede_id && "ok"
              }`}
          >
            <label htmlFor="sede_id">{i18n.t("City")}</label>
            <input
              ref={register({
                required: "Headquarters city is mandatory"
              })}
              name="sede_id"
              id="sede_id"
              type="text"
              placeholder={i18n.t("Headquarters city")}
            ></input>
            {errors.sede_id && (
              <span className="errorMessage">
                {i18n.t(errors.sede_id.message)}
              </span>
            )}
          </div>

          <div className="btn-container">
            <button
              type="submit"
              className="btn"
              disabled={formState.isSubmitting}
            >
              {i18n.t("Save")}
            </button>
          </div>
        </form>

        {/* <div
          className={`form-control ${
            errors.logo ? "ko" : formState.touched.logo && "ok"
          }`}
        >
          <label htmlFor="logo">{i18n.t("Upload company logo")}</label>
          <input
            ref={register}
            name="logo"
            id="logo"
            type="file"
            accept="image/png, image/jpeg"
            placeholder={i18n.t("My company logo")}
          ></input>
          {errors.logo && (
            <span className="errorMessage">{i18n.t(errors.logo.message)}</span>
          )}
        </div> */}
      </main>
      <Footer />
    </React.Fragment>
  );
}
