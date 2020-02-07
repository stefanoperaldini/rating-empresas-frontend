import React, { useEffect, useState, useReducer, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";

import { useAuth } from "../context/auth-context";
import {
  getCompanies,
  getSectors,
  createCompany,
  createSector,
} from "../http/companyService";

import { createPosition, createReview } from "../http/reviewService"

import { getPositions } from "../http/reviewService";
import {
  setErrorMessageCallBackEnd,
  validatorCompanyName,
  validatorSector,
  validatorCity,
  validatorSalary,
  validatorTitleReview,
  validatorDescriptionReview,
  validatorPosition,
} from "./pagesUtils";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

import "../css/review-create.css";

/**
 * Review create
 */

const useStyles = makeStyles({
  rating: {
    width: 200,
    display: "flex",
    alignItems: "center"
  }
});

export function ReviewCreate() {
  const { handleSubmit, register, errors, formState, setError } = useForm({
    mode: "onBlur"
  });
  const history = useHistory();

  const classes = useStyles();
  const { t } = useTranslation();

  const [valuations, setValuations] = useState({
    salary_valuation: 1,
    inhouse_training: 1,
    growth_opportunities: 1,
    work_enviroment: 1,
    personal_life: 1
  });
  const [companies, setCompanies] = useState([]);

  const [company, setCompany] = useState({
    id: null, name: null,
    sectorName: null, sectorId: null
  });

  const [isToNext, setIsToNext] = useState(false);
  const [sectors, setSectors] = useState([]);
  const [positions, setPositions] = useState([]);


  useEffect(() => {
    getCompanies()
      .then(response => {
        setCompanies(response.data.rows);
      })
      .catch(error => {
        setError("name", "backend", setErrorMessageCallBackEnd(error));
        return;
      });

    getSectors()
      .then(response => {
        setSectors(response.data.rows);
      })
      .catch(error => {
        setError("name", "backend", setErrorMessageCallBackEnd(error));
        return;
      });

    getPositions()
      .then(response => {
        setPositions(response.data.rows);
      })
      .catch(error => {
        setError("name", "backend", setErrorMessageCallBackEnd(error));
        return;
      });

    return;

  }, [setError]);

  const handleReviewCreateCompany = formData => {
    for (let companyItem of companies) {
      if (company.name === companyItem.name) {
        setCompany({
          ...company, id: companyItem.id, name: companyItem.name,
          sectorName: companyItem.sector, sectorId: companyItem.sectorId
        });
        break;
      }
    }
    setIsToNext(true);

  };

  const handleReviewCreate = async (formData) => {
    let companyId = company.id;
    try {
      if (!companyId) {
        let sectorId = null;

        for (let sector of sectors) {
          if (formData.sector === sector.sector) {
            sectorId = sector.id;
          }
        }

        if (!sectorId) {
          const { headers } = await createSector({ sector: formData.sector });
          const location = headers.location.split("/");
          sectorId = location[location.length - 1];
        }

        const formDataCompany = {
          name: formData.companyname,
          sector_id: sectorId, sede_id: formData.city_id
        };

        const { headers } = await createCompany(formDataCompany);
        const location = headers.location.split("/");
        companyId = location[location.length - 1];
      }

      let positionId = null;

      for (let position of positions) {
        if (formData.position === position.name) {

          positionId = position.id;
        }
      }

      if (!positionId) {
        const { headers } = await createPosition({
          "name": formData.position
        });
        const location = headers.location.split("/");
        positionId = location[location.length - 1];
      }
      const salary = formData.salary.length === 0 ? undefined : formData.salary;
      const formDataReview = {
        ...formData, ...valuations, position_id: positionId, company_id: companyId,
        sector: undefined, companyname: undefined, position: undefined, salary: salary,
      }
      console.log(formDataReview);

      return createReview(formDataReview)
        .then(response => {
          history.push(`/company/detail/${companyId}`);
        })
        .catch(error => {
          setError("city_id", "backend", setErrorMessageCallBackEnd(error));
        })
    } catch (error) {
      setError("city_id", "backend", setErrorMessageCallBackEnd(error));
    }
  };



  return (
    <React.Fragment>
      <Header />
      <main>
        <h3>{t("Create a review")}</h3>
        <h4>{t("Rate a company you've worked for in the past 3 years.")}</h4>
        <h4>{t("Reviews published are anonymous.")}</h4>

        {(!isToNext) ?
          (<form onSubmit={handleSubmit(handleReviewCreateCompany)} noValidate>

            <div className="form-control">
              <label htmlFor="name">{t("Name")} (*)</label>
              <input
                list="companyName"
                ref={register(validatorCompanyName)}
                name="name"
                id="name"
                type="text"
                value={company.name}
                onChange={e => {
                  setCompany({ ...company, name: e.target.value })
                  return e.target.value;

                }}
              ></input>
              <datalist id="companyName">
                {companies.map(element => (
                  <option key={element.name} value={element.name}>
                    {element.name}
                  </option>
                ))}
              </datalist>
              {errors.name && (
                <span className="errorMessage">{t(errors.name.message)}</span>
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
          </form>)
          : (
            <form onSubmit={handleSubmit(handleReviewCreate)} noValidate>
              <fieldset>
                <legend>
                  <h4>{t("Rate company")}</h4>
                </legend>

                <div className={`form-control ${classes.rating}`}>
                  <label className="itemsReview" htmlFor="salary_valuation">
                    {t("Salary")}
                  </label>
                  <Rating
                    name="salary_valuation"
                    id="salary_valuation"
                    value={valuations["salary_valuation"]}
                    precision={1}
                    onChange={(event, newValue) => {
                      setValuations({ ...valuations, salary_valuation: newValue });
                    }}
                  />
                </div>

                <div className={`form-control ${classes.rating}`}>
                  <label className="itemsReview" htmlFor="inhouse_training">
                    {t("Internal training")}
                  </label>
                  <Rating
                    name="inhouse_training"
                    id="inhouse_training"
                    value={valuations["inhouse_training"]}
                    precision={1}
                    onChange={(event, newValue) => {
                      setValuations({ ...valuations, inhouse_training: newValue });
                    }}
                  />
                </div>

                <div className={`form-control ${classes.rating}`}>
                  <label className="itemsReview" htmlFor="growth_opportunities">
                    {t("Growth opportunities")}
                  </label>
                  <Rating
                    name="growth_opportunities"
                    id="growth_opportunities"
                    value={valuations["growth_opportunities"]}
                    precision={1}
                    onChange={(event, newValue) => {
                      setValuations({ ...valuations, growth_opportunities: newValue });
                    }}
                  />
                </div>

                <div className={`form-control ${classes.rating}`}>
                  <label className="itemsReview" htmlFor="work_enviroment">
                    {t("Work environment")}
                  </label>
                  <Rating
                    name="work_enviroment"
                    id="work_enviroment"
                    value={valuations["work_enviroment"]}
                    precision={1}
                    onChange={(event, newValue) => {
                      setValuations({ ...valuations, work_enviroment: newValue });
                    }}
                  />
                </div>

                <div className={`form-control ${classes.rating}`}>
                  <label className="itemsReview" htmlFor="personal_life">
                    {t("Work&Life balance")}
                  </label>
                  <Rating
                    name="personal_life"
                    id="personal_life"
                    value={valuations["personal_life"]}
                    precision={1}
                    onChange={(event, newValue) => {
                      setValuations({ ...valuations, personal_life: newValue });
                    }}
                  />
                </div>
              </fieldset>

              <fieldset>
                <legend>
                  <h4>{t("Salary")}</h4>
                </legend>

                <div className="form-control">
                  <label htmlFor="salary">{t("Your salary")}</label>
                  <input
                    className="salary-ammount"
                    ref={register(validatorSalary)}
                    name="salary"
                    id="salary"
                    type="number"
                    placeholder={t("Example: 2000")}
                  ></input>
                  <label htmlFor="salary">€ / {t("month")}</label>
                  {errors.salary && (
                    <span className="errorMessage">{t(errors.salary.message)}</span>
                  )}
                </div>
              </fieldset>

              <fieldset>
                <legend>
                  <h4>{t("Could you add something else to your rating?")}</h4>
                </legend>
                <div className="form-control">
                  <label htmlFor="comment_title">{t("Review summary")}</label>
                  <input
                    ref={register(validatorTitleReview)}
                    name="comment_title"
                    id="comment_title"
                    type="text"
                    placeholder={t("Please, write a title")}
                  ></input>
                  {errors.comment_title && (
                    <span className="errorMessage">
                      {t(errors.comment_title.message)}
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label htmlFor="comment">{t("Your review")}</label>
                  <textarea
                    ref={register(validatorDescriptionReview)}
                    name="comment"
                    id="comment"
                    type="text"
                  ></textarea>
                  {errors.comment && (
                    <span className="errorMessage">
                      {t(errors.comment.message)}
                    </span>
                  )}
                </div>
              </fieldset>

              <fieldset>
                <legend>
                  <h4>{t("Tell us about your job")}</h4>
                </legend>
                <div className="form-control">
                  <label htmlFor="name">{t("Name")} (*)</label>
                  <input
                    ref={register(validatorCompanyName)}
                    name="companyname"
                    id="companyname"
                    type="text"
                    placeholder={t("Company name")}
                    value={company.name}
                    readOnly={company.id}
                  ></input>
                  {errors.companyname && (
                    <span className="errorMessage">{t(errors.companyname.message)}</span>
                  )}
                </div>

                <div className="form-control">
                  <label htmlFor="sector">{t("Sector")} (*)</label>
                  <input
                    list="listSectors"
                    ref={register(validatorSector)}
                    name="sector"
                    id="sector"
                    type="text"
                    placeholder={t("Sector name")}
                    onChange={e => e.target.value}
                    value={company.id && company.sectorName}
                    readOnly={company.id}
                  ></input>
                  <datalist id="listSectors">
                    {sectors.map(element => (
                      <option key={element.sector} value={element.sector}>
                        {element.sector}
                      </option>
                    ))}
                  </datalist>
                  {errors.sector && (
                    <span className="errorMessage">{t(errors.sector.message)}</span>
                  )}
                </div>

                <div className="form-control">
                  <label htmlFor="position">{t("Position")} (*)</label>
                  <input
                    list="listPositions"
                    ref={register(validatorPosition)}
                    name="position"
                    id="position"
                    type="text"
                    placeholder={t("Position name")}
                    onChange={e => e.target.value}
                  ></input>
                  <datalist id="listPositions">
                    {positions.map(element => (
                      <option key={element.name} value={element.name}>
                        {element.name}
                      </option>
                    ))}
                  </datalist>
                  {errors.position && (
                    <span className="errorMessage">{t(errors.position.message)}</span>
                  )}
                </div>

                <div className="form-control">
                  <label htmlFor="city_id">{t("City")} (*)</label>
                  <input
                    ref={register({
                      required: "Required"
                    })}
                    name="city_id"
                    id="city_id"
                    type="text"
                    onChange={e => e.target.value}
                    placeholder={t("City")}
                  ></input>
                  {errors.city_id && (
                    <span className="errorMessage">{t(errors.city_id.message)}</span>
                  )}
                </div>

                <div className="form-control">
                  <label htmlFor="start_year">{t("Start year")} (*)</label>
                  <select
                    name="start_year"
                    id="start_year"
                    ref={register({
                      required: "Required"
                    })}
                  >
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
                  {errors.start_year && (
                    <span className="errorMessage">{t(errors.start_year)}</span>
                  )}
                </div>
                <div className="form-control">
                  <label htmlFor="end_year">{t("End year")} (*)</label>
                  <select name="end_year" id="end_year" ref={register()}>
                    <option value="null">{t("I currently work here")}</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                  </select>
                  {errors.end_year && (
                    <span className="errorMessage">{t(errors.end_year)}</span>
                  )}
                </div>
              </fieldset>
              <p>(*) {t("Field required")}</p>
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

          )
        }
      </main>
      <Footer />
    </React.Fragment >
  );
}
