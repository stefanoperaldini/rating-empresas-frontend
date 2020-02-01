import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { createCompany } from "../http/companyService";
import { setErrorMessageCallBackEnd } from './pagesUtils';
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
    reset,
  } = useForm({
    mode: "onBlur"
  });

  const history = useHistory();
  const { t } = useTranslation();

  const handleCompanyCreate = formData => {
    const formDataFiltered = { ...formData, confirmPassword: undefined }
    return createCompany(formDataFiltered)
      .then(response => {
        history.push('/company/detail');
      })
      .catch(error => {
        setError('sede_id', 'backend', setErrorMessageCallBackEnd(error));
      });
  };

  // reset({
  //   firstName: "bill",
  //   lastName: "luo"
  // });

  // useEffect(() => {
  //   getCompany().then(response =>
  //     dispatch({ type: 'GET_NOTES_SUCCESS', initialNotes: response.data.rows })
  //   );
  // }, []);

  return (
    <React.Fragment>
      <Header />
      <main className="centered-container">
        <h3>{t("My company")}</h3>
        <form onSubmit={handleSubmit(handleCompanyCreate)} noValidate>
          {/* <div
          className={`form-control ${
            errors.logo ? "ko" : formState.touched.logo && "ok"
          }`}
        >
          <label htmlFor="logo">{t("Upload company logo")}</label>
          <input
            ref={register}
            name="logo"
            id="logo"
            type="file"
            accept="image/png, image/jpeg"
            placeholder={t("My company logo")}
          ></input>
          {errors.logo && (
            <span className="errorMessage">{t(errors.logo.message)}</span>
          )}
        </div> */}
          <div
            className={`form-control ${
              errors.name ? "ko" : formState.touched.name && "ok"
              }`}
          >
            <label htmlFor="name">{t("Name")}</label>
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
              placeholder={t("My company name")}
            ></input>
            {errors.name && (
              <span className="errorMessage">
                {t(errors.name.message)}
              </span>
            )}
          </div>
          <div
            className={`form-control ${
              errors.description ? "ko" : formState.touched.description && "ok"
              }`}
          >
            <label htmlFor="description">{t("Description")}</label>
            <textarea
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
              type="text"
              placeholder={t("About my company")}
            ></textarea>
            {errors.description && (
              <span className="errorMessage">
                {t(errors.description.message)}
              </span>
            )}
          </div>
          <div
            className={`form-control ${
              errors.sector_id ? "ko" : formState.touched.sector_id && "ok"
              }`}
          >
            <label htmlFor="sector_id">{t("Sector")}</label>
            <input
              ref={register({
                required: "Sector is mandatory"
              })}
              name="sector_id"
              id="sector_id"
              type="text"
              placeholder={t("My company's sector")}
            ></input>
            {errors.sector_id && (
              <span className="errorMessage">
                {t(errors.sector_id.message)}
              </span>
            )}
          </div>
          <div
            className={`form-control ${
              errors.url_web ? "ko" : formState.touched.url_web && "ok"
              }`}
          >
            <label htmlFor="url_web">{t("URL")}</label>
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
              placeholder={t("Website")}
            ></input>
            {errors.url_web && (
              <span className="errorMessage">
                {t(errors.url_web.message)}
              </span>
            )}
          </div>
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
              placeholder={t("linkedin address")}
            ></input>
            {errors.linkedin && (
              <span className="errorMessage">
                {t(errors.linkedin.message)}
              </span>
            )}
          </div>
          <div
            className={`form-control ${
              errors.address ? "ko" : formState.touched.address && "ok"
              }`}
          >
            <label htmlFor="address">{t("Address")}</label>
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
              placeholder={t("Headquarters address")}
            ></input>
            {errors.address && (
              <span className="errorMessage">
                {t(errors.address.message)}
              </span>
            )}
          </div>
          <div
            className={`form-control ${
              errors.sede_id ? "ko" : formState.touched.sede_id && "ok"
              }`}
          >
            <label htmlFor="sede_id">{t("Headquarter")}</label>
            <input
              ref={register({
                required: "Headquarter city is mandatory"
              })}
              name="sede_id"
              id="sede_id"
              type="text"
              placeholder={t("Headquarter city")}
            ></input>
            {errors.sede_id && (
              <span className="errorMessage">
                {t(errors.sede_id.message)}
              </span>
            )}
          </div>

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
      </main>
      <Footer />
    </React.Fragment>
  );
}
