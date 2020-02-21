import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Rating from "@material-ui/lab/Rating";
import { Chart } from "@bit/primefaces.primereact.chart";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import { getCompany, getCompanyCities } from "../http/companyService";
import { getReviewsFilter, getPositionsCompany } from "../http/reviewService";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { RateCompanyLink } from "../components/RateCompanyLink";
import { useAuth } from "../context/auth-context";
import defaultImageCompany from "../img/company-default.png";
import { ListReviews } from "../components/ListReviews";
import { DotsYellow } from "../components/AppLottie";

/**
 * Page company detail
 */

const useStyles = makeStyles({
  rating: {
    // width: 348,
    display: "flex",
    alignItems: "flex-start"
  }
});

function getColor(numPositions) {
  const backgroundColor = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4CAF50",
    "#EE6C4D",
    "#324A69",
    "#701C38",
    "#669F64",
    "483C46",
    "#8AC6D0"
  ];

  let backgroundColorRes = [];

  for (let index = 1; index <= numPositions; index++) {
    let mIndex = index % 10;
    if (mIndex === 0) {
      backgroundColorRes = [...backgroundColorRes, backgroundColor[9]];
    } else {
      backgroundColorRes = [...backgroundColorRes, backgroundColor[mIndex - 1]];
    }
  }
  return backgroundColorRes;
}

export function Company() {
  const { handleSubmit, register, formState } = useForm({
    mode: "onSubmit"
  });
  const [company, setCompany] = useState(null);
  const [positionsCompany, setPositionsCompany] = useState([]);
  const [reviewsCompany, setReviewsCompany] = useState(null);
  const [isFirst, setIsFirst] = useState(true);
  const [isLast, setIsLast] = useState(false);
  const [companyCities, setCompanyCities] = useState([]);
  const [idReviewDeleted, setIdReviewDeleted] = useState(null);
  const classes = useStyles();
  const { t } = useTranslation();
  const params = useParams();
  const idCompany = params.id;
  const { currentUserId, role } = useAuth();
  const formFiltros = useRef(null);
  const history = useHistory();

  const backgroundColorRes = getColor(positionsCompany.length);

  const dataPositionDiagram =
    positionsCompany.length !== 0
      ? {
          labels: positionsCompany.map(position => position.name),
          datasets: [
            {
              data: positionsCompany.map(position => position.numsReviews),
              backgroundColor: backgroundColorRes,
              hoverBackgroundColor: backgroundColorRes
            }
          ]
        }
      : null;

  const dataSalaryDiagram =
    positionsCompany.length !== 0
      ? {
          labels: positionsCompany.map((_, index) => index),
          datasets: [
            {
              type: "line",
              label: t("Salary trend (€)"),
              borderColor: "#2196F3",
              borderWidth: 2,
              fill: false,
              data: positionsCompany.map(position => position.avg_salary)
            },
            {
              type: "bar",
              label: t("Position salary (€)"),
              backgroundColor: "#4CAF50",
              data: positionsCompany.map(position => position.avg_salary),
              borderColor: "white",
              borderWidth: 2
            }
          ]
        }
      : null;

  const options = {
    responsive: true,
    tooltips: {
      mode: "index",
      intersect: true
    }
  };

  useEffect(() => {
    getCompany(idCompany).then(response => {
      setCompany(response.data);
    }).catch(error => {
      setCompany({});
      //if error o not reviews for the company
      history.push("/home");
      return;
    });
    getPositionsCompany(idCompany).then(response => {
      setPositionsCompany(response.data);
    });
    getCompanyCities(idCompany).then(response => {
      setCompanyCities(response.data);
    });
    getReviewsFilter(`companyId=${idCompany}&page=1&row4page=5`).then(
      response => {
        setReviewsCompany(response.data);
        if (response.data.page * 5 >= response.data.numsRows) {
          setIsLast(true);
        }
      }
    );
    return;
  }, [idCompany, idReviewDeleted, history]);

  const handleCompanySearch = (formData, e) => {
    let queryString = `companyId=${idCompany}&page=1&row4page=5&sortTipe=${formData.sortTipe}`;
    if (formData.positionId !== "Empty") {
      queryString = `${queryString}&positionId=${formData.positionId}`;
    }
    if (formData.cityId !== "Empty") {
      queryString = `${queryString}&cityId=${formData.cityId}`;
    }
    getReviewsFilter(queryString)
      .then(response => {
        setReviewsCompany(response.data);
        if (response.data.page * 5 >= response.data.numsRows) {
          setIsLast(true);
        }
        if (parseInt(response.data.page) === 1) {
          setIsFirst(true);
        } else {
          setIsFirst(false);
        }
      })
      .catch(error => {
        setReviewsCompany({ numsRows: 0, page: 0, reviews: [] });
        setIsFirst(true);
        setIsLast(true);
      });
  };

  const handleClickPaging = e => {
    window.scrollTo(0, 0);

    const form = formFiltros.current;

    let pageToGet = reviewsCompany.page;
    if (e.target.matches("button.next")) {
      pageToGet += 1;
    }
    if (e.target.matches("button.prev")) {
      pageToGet -= 1;
      setIsLast(false);
    }

    let queryString = `companyId=${idCompany}&page=${pageToGet}&row4page=5&sortTipe=${form["sortTipe"].value}`;
    if (form["positionId"].value !== "Empty") {
      queryString = `${queryString}&positionId=${form["positionId"].value}`;
    }
    if (form["cityId"].value !== "Empty") {
      queryString = `${queryString}&cityId=${form["cityId"].value}`;
    }
    getReviewsFilter(queryString)
      .then(response => {
        setReviewsCompany(response.data);
        if (response.data.page * 5 >= response.data.numsRows) {
          setIsLast(true);
        }
        if (parseInt(response.data.page) === 1) {
          setIsFirst(true);
        } else {
          setIsFirst(false);
        }
      })
      .catch(error => {
        setReviewsCompany({ numsRows: 0, page: 0, reviews: [] });
        setIsFirst(true);
        setIsLast(true);
      });
  };

  return (
    <React.Fragment>
      <Header />
      <main className="centered-container-home p-t-md p-r-md p-l-md">
        {(!currentUserId || role === "1") && <RateCompanyLink />}
        {!company ? (
          <div className="flexRow">
            <DotsYellow />
          </div>
        ) : (
          <section className="companyDetail">
            <header className="companyTitle flexRow m-t-lg b-bog">
              <img
                src={company.url_logo ? company.url_logo : defaultImageCompany}
                alt={
                  company.url_logo
                    ? t("Image company")
                    : t("Default image company")
                }
              />
              <h1 className="f-s-xl m-l-xl">{company.name}</h1>
            </header>

            <aside className="asideCompany">
              <div className={`${classes.rating}`}>
                {company.everage}
                <Rating
                  name="overall_rating"
                  id="overall_rating"
                  size="large"
                  value={parseFloat(company.everage)}
                  precision={0.5}
                  readOnly
                  className="m-l-xs"
                />
                <span className="m-l-md">{t("Overall rating")}</span>
              </div>
              <div className={`${classes.rating}`}>
                {company.avg_salary_valuation}
                <Rating
                  name="salary_valuation"
                  id="salary_valuation"
                  size="small"
                  value={parseFloat(company.avg_salary_valuation)}
                  precision={0.5}
                  readOnly
                  className="m-l-sm"
                />
                <span className="m-l-md">{t("Salary")}</span>
              </div>

              <div className={`${classes.rating}`}>
                {company.avg_inhouse_training}
                <Rating
                  name="inhouse_training"
                  id="inhouse_training"
                  size="small"
                  value={parseFloat(company.avg_inhouse_training)}
                  precision={0.5}
                  readOnly
                  className="m-l-sm"
                />
                <span className="m-l-md"> {t("Internal training")}</span>
              </div>
              <div className={`${classes.rating}`}>
                {company.avg_growth_opportunities}
                <Rating
                  name="growth_opportunities"
                  id="growth_opportunities"
                  size="small"
                  value={parseFloat(company.avg_growth_opportunities)}
                  precision={0.5}
                  readOnly
                  className="m-l-sm"
                />
                <span className="m-l-md">{t("Growth opportunities")}</span>
              </div>
              <div className={`${classes.rating}`}>
                {company.avg_work_enviroment}
                <Rating
                  name="work_enviroment"
                  id="work_enviroment"
                  size="small"
                  value={parseFloat(company.avg_work_enviroment)}
                  precision={0.5}
                  readOnly
                  className="m-l-sm"
                />
                <span className="m-l-md">{t("Work environment")}</span>
              </div>
              <div className={`${classes.rating}`}>
                {company.avg_personal_life}
                <Rating
                  name="personal_life"
                  id="personal_life"
                  size="small"
                  value={parseFloat(company.avg_personal_life)}
                  precision={0.5}
                  readOnly
                  className="m-l-sm"
                />
                <span className="m-l-md">{t("Work&Life balance")}</span>
              </div>
              <section>
                <h2 className="m-t-lg f-s-m">
                  {t("Average salary")}{" "}
                  {company.avg_salary ? company.avg_salary : "--"} €/
                  {t("month")}
                </h2>
              </section>

              <section>
                <h2 className="m-t-lg f-s-m"> {company.name} </h2>
                <p>{company.sector}</p>
                <textarea
                  className="descriptionCompany f-s-sm"
                  value={company.description}
                  readOnly
                />
                <p>
                  {company.address} - {company.sede_name}
                </p>
                <p>
                  <a href={company.url_web}>{company.url_web}</a>
                </p>
                <p>
                  <a href={company.linkedin}>{company.linkedin}</a>
                </p>
              </section>
              {dataPositionDiagram && (
                <section className="m-t-xl">
                  <h2 className="f-s-m">{t("Reviews for job title")}</h2>
                  <div className="diagramWidth">
                    <Chart type="doughnut" data={dataPositionDiagram} />
                  </div>
                </section>
              )}
              {dataSalaryDiagram && (
                <section className="m-t-lg">
                  <h2 className="f-s-m">{t("Average salary")}</h2>
                  <div className="diagramWidth">
                    <Chart
                      type="bar"
                      data={dataSalaryDiagram}
                      options={options}
                    />
                  </div>
                  <ul className="m-t-lg">
                    {positionsCompany.map((position, index) => (
                      <li key={position.name} className="f-s-xs f-c-fourgray">
                        {index} - {position.name}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </aside>

            <main className="ratingCompany">
              <form
                className="ratingCompanyForm"
                ref={formFiltros}
                onSubmit={handleSubmit(handleCompanySearch)}
                noValidate
              >
                <fieldset>
                  <legend>
                    <h2 className="f-s-m p-b-sm">{t("Search for")}</h2>
                  </legend>
                  <span className="flexRow">
                    <select
                      name="positionId"
                      id="positionId"
                      className="m-r-xs"
                      ref={register}
                    >
                      <option value="Empty">&#60;{t("Position")}&#62;</option>
                      {positionsCompany.map(position => (
                        <option key={position.name} value={position.id}>
                          {position.name}
                        </option>
                      ))}
                    </select>
                    <select name="cityId" id="cityId" ref={register}>
                      <option value="Empty">&#60;{t("City")}&#62;</option>
                      {companyCities.map(city => (
                        <option key={city.name} value={city.id}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </span>
                </fieldset>
                <fieldset className="sortAndButton">
                  <legend>
                    <h2 className="f-s-m p-t-md p-b-sm">{t("Sort by")}</h2>
                  </legend>
                  <select name="sortTipe" id="sortTipe" ref={register}>
                    <option value="1">{t("Date")}</option>
                    <option value="2">{t("Overall rating")}</option>
                    <option value="3">{t("Salary")}</option>
                    <option value="4">{t("Internal training")}</option>
                    <option value="5">{t("Growth opportunities")}</option>
                    <option value="6">{t("Work environment")}</option>
                    <option value="7">{t("Work&Life balance")}</option>
                  </select>
                </fieldset>
                <button
                  type="submit"
                  className="btn searchFilter"
                  disabled={formState.isSubmitting}
                >
                  {t("Find")}
                </button>
              </form>

              <section>
                {!reviewsCompany ? (
                  <div className="flexRow">
                    <DotsYellow />
                  </div>
                ) : (
                  <React.Fragment>
                    <ListReviews
                      listReviews={reviewsCompany.reviews}
                      onReviewDeleted={idReview => setIdReviewDeleted(idReview)}
                    />
                    <div className="buttonsPrevNext">
                      <button
                        name="prev"
                        id="prev"
                        disabled={isFirst}
                        onClick={handleClickPaging}
                        className="advance prev"
                      >
                        {t("Previous")}
                      </button>
                      <button
                        name="next"
                        id="next"
                        disabled={isLast}
                        onClick={handleClickPaging}
                        className="advance next"
                      >
                        {t("Next")}
                      </button>
                    </div>
                  </React.Fragment>
                )}
              </section>
            </main>
          </section>
        )}
      </main>
      <Footer />
    </React.Fragment>
  );
}
