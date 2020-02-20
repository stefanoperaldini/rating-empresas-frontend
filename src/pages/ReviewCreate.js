import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";

import {
  getCompanies,
  getSectors,
  createCompany,
  createSector
} from "../http/companyService";

import { createPosition, createReview } from "../http/reviewService";

import { getPositions } from "../http/reviewService";
import {
  setErrorMessageCallBackEnd,
  validatorCompanyName,
  validatorSector,
  validatorSalary,
  validatorTitleReview,
  validatorDescriptionReview,
  validatorPosition
} from "./pagesUtils";
import { Cities } from "../components/Cities";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

/**
 * Review create
 */

const useStyles = makeStyles({
  rating: {
    width: 360,
    display: "flex",
    alignItems: "flex-start"
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
    id: null,
    name: null,
    sectorName: null,
    sectorId: null
  });

  const [isToNext, setIsToNext] = useState(false);
  const [idCity, setIdCity] = useState(null);
  const [sectors, setSectors] = useState([]);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    getCompanies(`filters=no`)
      .then(response => {
        setCompanies(response.data.rows_companies);
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
          ...company,
          id: companyItem.company_id,
          name: companyItem.name,
          sectorName: companyItem.sector_name,
          sectorId: companyItem.sector_id
        });
        break;
      }
    }
    setIsToNext(true);
  };

  const handleReviewCreate = async formData => {
    let companyId = company.id;
    if (!idCity) {
      setError("city_id", "frontend", t("This field is required"));
      return;
    }
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
          sector_id: sectorId,
          sede_id: idCity
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
          name: formData.position
        });
        const location = headers.location.split("/");
        positionId = location[location.length - 1];
      }
      const salary = formData.salary.length === 0 ? undefined : formData.salary;
      const formDataReview = {
        ...formData,
        ...valuations,
        position_id: positionId,
        company_id: companyId,
        sector: undefined,
        companyname: undefined,
        position: undefined,
        salary: salary,
        city_id: idCity
      };

      console.log(formDataReview);

      return createReview(formDataReview)
        .then(response => {
          history.push(`/company/detail/${companyId}`);
        })
        .catch(error => {
          setError("city_id", "backend", setErrorMessageCallBackEnd(error));
        });
    } catch (error) {
      setError("city_id", "backend", setErrorMessageCallBackEnd(error));
    }
  };

  return (
    <React.Fragment>
      <Header />
      <main className="centered-container-home m-t-md">
        <h1 className="f-s-l txtCenter p-b-sm">{t("Create a review")}</h1>
        <p className="txtCenter">
          {t("Rate a company you've worked for in the past 3 years.")}
        </p>
        <p className="txtCenter">{t("Reviews published are anonymous.")}</p>

        {!isToNext ? (
          <form onSubmit={handleSubmit(handleReviewCreateCompany)} noValidate>
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
                  setCompany({ ...company, name: e.target.value });
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
                className="m-t-md btn"
                disabled={formState.isSubmitting}
              >
                {t("Next")}
              </button>
            </div>
          </form>
        ) : (
          <form
            className="m-t-md"
            onSubmit={handleSubmit(handleReviewCreate)}
            noValidate
          >
            <fieldset className="reviewCreate">
              <legend>
                <h2 className="f-s-sm marginBottom">{t("Rate company")}</h2>
              </legend>

              <div className={`form-control reviewCreate ${classes.rating}`}>
                <Rating
                  name="salary_valuation"
                  id="salary_valuation"
                  value={valuations["salary_valuation"]}
                  precision={1}
                  onChange={(event, newValue) => {
                    setValuations({
                      ...valuations,
                      salary_valuation: newValue ? newValue : 1
                    });
                  }}
                />
                <label htmlFor="salary_valuation" className="m-l-md">
                  {t("Salary")}
                </label>
              </div>

              <div className={`form-control reviewCreate ${classes.rating}`}>
                <Rating
                  name="inhouse_training"
                  id="inhouse_training"
                  value={valuations["inhouse_training"]}
                  precision={1}
                  onChange={(event, newValue) => {
                    setValuations({
                      ...valuations,
                      inhouse_training: newValue ? newValue : 1
                    });
                  }}
                />
                <label htmlFor="inhouse_training" className="m-l-md">
                  {t("Internal training")}
                </label>
              </div>

              <div className={`form-control reviewCreate ${classes.rating}`}>
                <Rating
                  name="growth_opportunities"
                  id="growth_opportunities"
                  value={valuations["growth_opportunities"]}
                  precision={1}
                  onChange={(event, newValue) => {
                    setValuations({
                      ...valuations,
                      growth_opportunities: newValue ? newValue : 1
                    });
                  }}
                />
                <label htmlFor="growth_opportunities" className="m-l-md">
                  {t("Growth opportunities")}
                </label>
              </div>

              <div className={`form-control reviewCreate ${classes.rating}`}>
                <Rating
                  name="work_enviroment"
                  id="work_enviroment"
                  value={valuations["work_enviroment"]}
                  precision={1}
                  onChange={(event, newValue) => {
                    setValuations({
                      ...valuations,
                      work_enviroment: newValue ? newValue : 1
                    });
                  }}
                />
                <label htmlFor="work_enviroment" className="m-l-md">
                  {t("Work environment")}
                </label>
              </div>

              <div className={`form-control reviewCreate ${classes.rating}`}>
                <Rating
                  name="personal_life"
                  id="personal_life"
                  value={valuations["personal_life"]}
                  precision={1}
                  onChange={(event, newValue) => {
                    setValuations({
                      ...valuations,
                      personal_life: newValue ? newValue : 1
                    });
                  }}
                />
                <label htmlFor="personal_life" className="m-l-md">
                  {t("Work&Life balance")}
                </label>
              </div>
            </fieldset>

            <fieldset className="reviewCreate">
              <legend>
                <h2 className="f-s-sm marginTop">{t("Salary")}</h2>
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
                  <span className="errorMessage">
                    {t(errors.salary.message)}
                  </span>
                )}
              </div>
            </fieldset>

            <fieldset className="reviewCreate">
              <legend>
                <h2 className="f-s-sm">
                  {t("Could you add something else to your rating?")}
                </h2>
              </legend>
              <div className="form-control">
                <label htmlFor="comment_title">{t("Review summary")} (*)</label>
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
                <label htmlFor="comment">{t("Your review")} (*)</label>
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

            <fieldset className="reviewCreate">
              <legend>
                <h2 className="f-s-sm">{t("Tell us about your job")}</h2>
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
                  <span className="errorMessage">
                    {t(errors.companyname.message)}
                  </span>
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
                  <span className="errorMessage">
                    {t(errors.sector.message)}
                  </span>
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
                  <span className="errorMessage">
                    {t(errors.position.message)}
                  </span>
                )}
              </div>

              <div className="form-control">
                <label>{t("City")} (*)</label>
                <Cities onClickCity={id => setIdCity(id)} />
                {errors.city_id && (
                  <span className="errorMessage">
                    {t(errors.city_id.message)}
                  </span>
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
            <p className="f-s-xs">(*) {t("Field required")}</p>
            <div className="btn-container">
              <button
                type="submit"
                className="m-t-md btn"
                disabled={formState.isSubmitting}
              >
                {t("Save")}
              </button>
            </div>
          </form>
        )}
      </main>
      <Footer />
    </React.Fragment>
  );
}
