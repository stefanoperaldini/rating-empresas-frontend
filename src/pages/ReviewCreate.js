import React from "react";
import i18n from "i18next";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Cities } from "../components/Cities";

/**
 * Review create
 */

export function ReviewCreate() {
  const { handleSubmit, register, errors, formState } = useForm({
    mode: "onBlur"
  });
  const history = useHistory();

  const handleCreate = formData => {
    console.log(formData);
    history.push("/home");
  };

  return (
    <React.Fragment>
      <Header />
      <main className="centered-container">
        <h3>{i18n.t("Create your review")}</h3>

        <form onSubmit={handleSubmit(handleCreate)} noValidate>
          <div>
            <label>{i18n.t("Company")}</label>

            <input name="name" type="text"></input>
          </div>

          <div>
            <label>{i18n.t("Location")}</label>
            <Cities />
          </div>

          <div>
            <label>{i18n.t("Position")}</label>
            <input name="position" type="text"></input>
          </div>

          <div>
            <label>{i18n.t("Salary")}</label>

            <input name="salary" type="text"></input>
          </div>

          <div>
            <label>{i18n.t("Start date")}</label>

            <input
              name="start_date"
              type="date"
              value=""
              min="2010-01-01"
              max="2030-12-31"
            ></input>
          </div>

          <div>
            <label>{i18n.t("End date")}</label>

            <input
              name="end_date"
              type="date"
              value=""
              min="2017-01-01"
              max="2030-12-31"
            ></input>
          </div>

          <div
            className={`form-control ${
              errors.password ? "ko" : formState.touched.password && "ok"
              }`}
          >
            <label>In-House Training</label>
            <input
              ref={register({
                required: "the valuation is mandatory",
                minLength: {
                  value: /^[1-5]{1,5}$/,
                  message: "enter a number between 1 and 5"
                }
              })}
              name="inhouse_training"
              type="number"
              placeholder="rate between 1 and 5"
            ></input>
            {errors.password && (
              <span className="errorMessage">{errors.password.message}</span>
            )}
          </div>

          <div
            className={`form-control ${
              errors.password ? "ko" : formState.touched.password && "ok"
              }`}
          >
            <label>Growth Opportunities</label>
            <input
              ref={register({
                required: "the valuation is mandatory",
                minLength: {
                  value: /^[1-5]{1,5}$/,
                  message: "enter a number between 1 and 5"
                }
              })}
              name="growth_opportunities"
              type="number"
              placeholder="rate between 1 and 5"
            ></input>
            {errors.password && (
              <span className="errorMessage">{errors.password.message}</span>
            )}
          </div>

          <div
            className={`form-control ${
              errors.password ? "ko" : formState.touched.password && "ok"
              }`}
          >
            <label>Work Enviroment</label>
            <input
              ref={register({
                required: "the valuation is mandatory",
                minLength: {
                  value: /^[1-5]{1,5}$/,
                  message: "enter a number between 1 and 5"
                }
              })}
              name="work_enviroment"
              type="number"
              placeholder="rate between 1 and 5"
            ></input>
            {errors.password && (
              <span className="errorMessage">{errors.password.message}</span>
            )}
          </div>

          <div
            className={`form-control ${
              errors.password ? "ko" : formState.touched.password && "ok"
              }`}
          >
            <label>Personal Life</label>
            <input
              ref={register({
                required: "the valuation is mandatory",
                minLength: {
                  value: /^[1-5]{1,5}$/,
                  message: "enter a number between 1 and 5"
                }
              })}
              name="personal_life"
              type="number"
              placeholder="rate between 1 and 5"
            ></input>
            {errors.password && (
              <span className="errorMessage">{errors.password.message}</span>
            )}
          </div>
          <div
            className={`form-control ${
              errors.password ? "ko" : formState.touched.password && "ok"
              }`}
          >
            <label>Company Culture</label>
            <input
              ref={register({
                required: "the valuation is mandatory",
                minLength: {
                  value: /^[1-5]{1,5}$/,
                  message: "enter a number between 1 and 5"
                }
              })}
              name="company_culture"
              type="number"
              placeholder="rate between 1 and 5"
            ></input>
            {errors.password && (
              <span className="errorMessage">{errors.password.message}</span>
            )}
          </div>
          <div className="longtext">
            <input
              type="text"
              placeholder="Enter your Review"
              name="Review"
              ref={register({ min: 10, maxLength: 500 })}
            />
          </div>
          <input type="submit" />

          <div className="btn-container">
            <button
              type="submit"
              className="btn"
              disabled={formState.isSubmitting}
            >
              {i18n.t("Submit")}
            </button>
          </div>
        </form>
        <Footer />
      </main>
    </React.Fragment>
  );
}
