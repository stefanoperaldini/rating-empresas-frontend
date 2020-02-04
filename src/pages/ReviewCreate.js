import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';

import "../css/review-create.css";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Cities } from "../components/Cities";
import {
  validatorCompanyName, validatorSalary, validatorTitleReview,
  validatorDescription, validatorSector, validatorPosition
} from './pagesUtils';

/**
 * Review create
 */

const useStyles = makeStyles({
  rating: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
  },
});

export function ReviewCreate() {
  const {
    handleSubmit,
    register,
    errors,
    formState,
  } = useForm({
    mode: "onBlur"
  });

  const classes = useStyles();
  const { t } = useTranslation();

  const [value, setValue] = useState({ salary_valuation: 1, inhouse_training: 1, growth_opportunities: 1, work_enviroment: 1, personal_life: 1 });

  const handleReviewCreate = formData => {
    console.log(formData);
  };

  return (
    <React.Fragment>
      <Header />
      <main>
        <h3>{t("Create a review")}</h3>
        <h4>
          {t("Rate a company you've worked for in the past 3 years.")}
        </h4>
        <h4>{t("Reviews published are anonymous.")}</h4>

        <form onSubmit={handleSubmit(handleReviewCreate)}>
          <div
            className={`form-control ${
              errors.name ? "ko" : formState.touched.name && "ok"
              }`}
          >
            <label htmlFor="name">{t("Company name")}</label>
            <input ref={register(validatorCompanyName)} name="name" id="name"
              type="text" placeholder={t("Please, select company name")}>
            </input>
            {errors.name && (
              <span className="errorMessage">
                {t(errors.name.message)}
              </span>
            )}
          </div>
          <div className="btn-container">
            <button
              type="submit"
              className="btn"
              disabled={formState.isSubmitting}
            >
              {t("Next")}
            </button>
          </div>
        </form>

        <form onSubmit={handleSubmit(handleReviewCreate)}>
          <fieldset>
            <legend>
              <h4>{t("Rate company")}</h4>
            </legend>
            <ul>

              <li className={`form-control ${classes.rating}`}>
                <label className="itemsReview" htmlFor="salary_valuation">
                  {t("Salary")}
                </label>
                <Rating
                  name="salary_valuation"
                  id="salary_valuation"
                  value={value["salary_valuation"]}
                  precision={1}
                  onChange={(event, newValue) => {
                    setValue({ ...value, "salary_valuation": newValue });
                  }}
                />
              </li>

              <li className={`form-control ${classes.rating}`}>
                <label className="itemsReview" htmlFor="inhouse_training">
                  {t("Internal training")}
                </label>
                <Rating
                  name="inhouse_training"
                  id="inhouse_training"
                  value={value["inhouse_training"]}
                  precision={1}
                  onChange={(event, newValue) => {
                    setValue({ ...value, "inhouse_training": newValue });
                  }}
                />
              </li>

              <li className={`form-control ${classes.rating}`}>
                <label className="itemsReview" htmlFor="growth_opportunities">
                  {t("Growth opportunities")}
                </label>
                <Rating
                  name="growth_opportunities"
                  id="growth_opportunities"
                  value={value["growth_opportunities"]}
                  precision={1}
                  onChange={(event, newValue) => {
                    setValue({ ...value, "growth_opportunities": newValue });
                  }}
                />
              </li>

              <li className={`form-control ${classes.rating}`}>
                <label className="itemsReview" htmlFor="work_enviroment">
                  {t("Work environment")}
                </label>
                <Rating
                  name="work_enviroment"
                  id="work_enviroment"
                  value={value["work_enviroment"]}
                  precision={1}
                  onChange={(event, newValue) => {
                    setValue({ ...value, "work_enviroment": newValue });
                  }}
                />
              </li>

              <li className={`form-control ${classes.rating}`}>
                <label className="itemsReview" htmlFor="personal_life">
                  {t("Work&Life balance")}
                </label>
                <Rating
                  name="personal_life"
                  id="personal_life"
                  value={value["personal_life"]}
                  precision={1}
                  onChange={(event, newValue) => {
                    setValue({ ...value, "personal_life": newValue });
                  }}
                />
              </li>

            </ul>
          </fieldset>

          <fieldset>
            <legend>
              <h4>{t("Salary")}</h4>
            </legend>

            <div
              className={`form-control ${
                errors.salary ? "ko" : formState.touched.salary && "ok"
                } ammount`}
            >
              <label htmlFor="salary">{t("Your salary")}</label>
              <input className="salary-ammount" ref={register(validatorSalary)} name="salary"
                id="salary" type="number" placeholder={t("Example: 2.000")}>
              </input>
              <label htmlFor="salary">{t("€ per month")}</label>
              {errors.salary && (
                <span className="errorMessage">
                  {t(errors.salary.message)}
                </span>
              )}
            </div>

          </fieldset>

          <fieldset>
            <legend>
              <h4>
                {t("Could you add something else to your rating?")}
              </h4>
            </legend>
            <ul>

              <li
                className={`form-control ${
                  errors.comment_title
                    ? "ko"
                    : formState.touched.comment_title && "ok"
                  }`}
              >
                <label htmlFor="comment_title">
                  {t("Review summary")}
                </label>
                <input
                  ref={register(validatorTitleReview)} name="comment_title" id="comment_title"
                  type="text" placeholder={t("Please, write a title")}>
                </input>
                {errors.comment_title && (
                  <span className="errorMessage">
                    {t(errors.comment_title.message)}
                  </span>
                )}
              </li>

              <li
                className={`form-control ${
                  errors.comment ? "ko" : formState.touched.comment && "ok"
                  }`}
              >
                <label htmlFor="comment">{t("Your review")}</label>
                <textarea
                  ref={register(validatorDescription)} name="comment" id="comment"
                  type="text">
                </textarea>
                {errors.comment && (
                  <span className="errorMessage">
                    {t(errors.comment.message)}
                  </span>
                )}
              </li>

            </ul>
          </fieldset>

          <fieldset>
            <legend>
              <h4>{t("Tell us about your job")}</h4>
            </legend>
            <ul>

              <li
                className={`form-control ${
                  errors.name ? "ko" : formState.touched.name && "ok"
                  }`}
              >
                <label htmlFor="name">{t("Name")}</label>
                <input
                  ref={register(validatorCompanyName)}
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
              </li>

              <li
                className={`form-control ${
                  errors.sector_id
                    ? "ko"
                    : formState.touched.sector_id && "ok"
                  }`}
              >
                <label htmlFor="sector_id">{t("Sector")}</label>
                <input ref={register(validatorSector)} name="sector_id" id="sector_id"
                  type="text" placeholder={t("My company's sector")}>
                </input>
                {errors.sector_id && (
                  <span className="errorMessage">
                    {t(errors.sector_id.message)}
                  </span>
                )}
              </li>

              <li
                className={`form-control ${
                  errors.position_id
                    ? "ko"
                    : formState.touched.position_id && "ok"
                  }`}
              >
                <label htmlFor="position_id">{t("Job title")}</label>
                <input ref={register(validatorPosition)} name="position_id" id="position_id"
                  type="text" placeholder={t("Please, enter your position")}>
                </input>
                {errors.position_id && (
                  <span className="errorMessage">
                    {t(errors.position_id.message)}
                  </span>
                )}
              </li>

              <div
                className={`form-control ${
                  errors.city ? "ko" : formState.touched.city && "ok"
                  }`}
              >
                <label htmlFor="city">{t("Headquarter")}</label>
                <input
                  ref={register({
                    required: 'Required',
                  })}
                  name="city"
                  id="city"
                  type="text"
                  value=""
                  onChange={e => console.log("Change city")}
                  placeholder={t("Headquarters")}
                ></input>
                {
                  errors.city && (
                    <span className="errorMessage">
                      {t(errors.city.message)}
                    </span>
                  )
                }
              </div>

              <li
                className={`form-control ${
                  errors.start_year_id
                    ? "ko"
                    : formState.touched.start_year && "ok"
                  } review-years`}
              >
                <label htmlFor="start_year">{t("Start year")}</label>
                <select
                  name="start_year"
                  id="start_year"
                  ref={register({
                    required: "Required"
                  })}
                >
                  <option value="Empty"></option>
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                  <option value="2018">2018</option>
                  <option value="2017">2017</option>
                  <option value="2016">2016</option>
                  <option value="2015">2015</option>
                  <option value="2014">2014</option>
                  <option value="2013">2013</option>
                  <option value="2012">2012</option>
                  <option value="2011">2011</option>
                  <option value="2010">2010</option>
                  <option value="2009">2009</option>
                  <option value="2008">2008</option>
                  <option value="2007">2007</option>
                  <option value="2006">2006</option>
                  <option value="2005">2005</option>
                  <option value="2004">2004</option>
                  <option value="2003">2003</option>
                  <option value="2002">2002</option>
                  <option value="2001">2001</option>
                  <option value="2000">2000</option>
                  <option value="1999">1999</option>
                  <option value="1998">1998</option>
                  <option value="1997">1997</option>
                  <option value="1996">1996</option>
                  <option value="1995">1995</option>
                  <option value="1994">1994</option>
                  <option value="1993">1993</option>
                  <option value="1992">1992</option>
                  <option value="1991">1991</option>
                  <option value="1990">1990</option>
                  <option value="1989">1989</option>
                  <option value="1988">1988</option>
                  <option value="1987">1987</option>
                  <option value="1986">1986</option>
                  <option value="1985">1985</option>
                  <option value="1984">1984</option>
                  <option value="1983">1983</option>
                  <option value="1982">1982</option>
                  <option value="1981">1981</option>
                  <option value="1980">1980</option>
                </select>

                <label htmlFor="end_year">{t("End year")}</label>
                <select
                  name="end_year"
                  id="end_year"
                  ref={register()}
                >
                  <option value="Empty"></option>
                  <option value="null">I currently work here</option>
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                  <option value="2018">2018</option>
                  <option value="2017">2017</option>
                </select>
                {errors.start_year && (
                  <span className="errorMessage">
                    {t(errors.start_year)}
                  </span>
                )}
              </li>

            </ul>
          </fieldset>

          <div className="btn-container">
            <button
              type="submit"
              className="btn"
              disabled={formState.isSubmitting}
            >
              {t("Send")}
            </button>
          </div>

        </form>
      </main>
      <Footer />
    </React.Fragment>
  );
}
