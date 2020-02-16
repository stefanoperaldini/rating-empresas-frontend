import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Rating from "@material-ui/lab/Rating";
import { Chart } from '@bit/primefaces.primereact.chart';
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";

import { getCompany, getCompanyCities } from "../http/companyService";
import { getReviewsFilter, getPositionsCompany } from "../http/reviewService";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { RateCompanyLink } from "../components/RateCompanyLink";
import { useAuth } from "../context/auth-context";
import defaultImageCompany from "../img/company-default.png";
import { ListReviews } from "../components/ListReviews";

/**
 * Page company detail
 */

const useStyles = makeStyles({
  rating: {
    width: 200,
    display: "flex",
    alignItems: "center"
  }
});


function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function Company() {
  const { handleSubmit, register, formState, } = useForm({
    mode: "onSubmit"
  });
  const [company, setCompany] = useState({});
  const [positionsCompany, setPositionsCompany] = useState([]);
  const [reviewsCompany, setReviewsCompany] = useState({ numsRows: 0, page: 0, reviews: [] });
  const [isFirst, setIsFirst] = useState(true);
  const [isLast, setIsLast] = useState(false);
  const [companyCities, setCompanyCities] = useState([]);
  const classes = useStyles();
  const { t } = useTranslation();
  const params = useParams();
  const idCompany = params.id;
  const { currentUserId, role } = useAuth();
  const location = useLocation();
  const formFiltros = useRef(null);

  const dataPositionDiagram = (positionsCompany.length !== 0) ? {
    labels: positionsCompany.map(position => position.name),
    datasets: [
      {
        data: positionsCompany.map(position => position.numsReviews),
        backgroundColor: positionsCompany.map(() => getRandomColor()),
        hoverBackgroundColor: positionsCompany.map(() => getRandomColor()),
      }]
  } : null;

  const dataSalaryDiagram = (positionsCompany.length !== 0) ? {
    labels: positionsCompany.map(position => position.name),
    datasets: [
      {
        type: 'line',
        label: 'Salary trend',
        borderColor: '#2196F3',
        borderWidth: 2,
        fill: false,
        data: positionsCompany.map((position) => position.avg_salary)
      },
      {
        type: 'bar',
        label: 'Position salary',
        backgroundColor: '#4CAF50',
        data: positionsCompany.map((position) => position.avg_salary),
        borderColor: 'white',
        borderWidth: 2
      },
    ]
  } : null;

  console.log(dataPositionDiagram, dataSalaryDiagram);

  const options = {
    responsive: true,
    title: {
      display: true,
      text: 'Combo Bar Line Chart'
    },
    tooltips: {
      mode: 'index',
      intersect: true
    }
  };

  useEffect(() => {
    getCompany(idCompany).then(response => {
      setCompany(response.data);
    });
    getPositionsCompany(idCompany).then(response => {
      setPositionsCompany(response.data);
    });
    getCompanyCities(idCompany).then(response => {
      setCompanyCities(response.data);
    });
    getReviewsFilter(`companyId=${idCompany}&page=1&row4page=5`).then(response => {
      setReviewsCompany(response.data);
      if ((response.data.page * 5) >= response.data.numsRows) {
        setIsLast(true);
      }
    });
    return;
  }, [idCompany]);

  const handleCompanySearch = (formData, e) => {
    let queryString = `companyId=${idCompany}&page=1&row4page=5&sortTipe=${formData.sortTipe}`;
    if (formData.positionId !== "Empty") {
      queryString = `${queryString}&positionId=${formData.positionId}`
    }
    if (formData.cityId !== "Empty") {
      queryString = `${queryString}&cityId=${formData.cityId}`
    }
    getReviewsFilter(queryString).then(response => {
      setReviewsCompany(response.data);
      if ((response.data.page * 5) >= response.data.numsRows) {
        setIsLast(true);
      }
      if (parseInt(response.data.page) === 1) {
        setIsFirst(true);
      } else {
        setIsFirst(false);
      }
    }).catch(error => {
      setReviewsCompany({ numsRows: 0, page: 0, reviews: [] });
      setIsFirst(true);
      setIsLast(true);
    });
  };

  const handleClickPaging = (e) => {

    window.scrollTo(0, 0);

    const form = formFiltros.current

    let pageToGet = reviewsCompany.page;
    if (e.target.matches('button.next')) {
      pageToGet += 1;
    }
    if (e.target.matches('button.prev')) {
      pageToGet -= 1;
      setIsLast(false);
    }

    let queryString = `companyId=${idCompany}&page=${pageToGet}&row4page=5&sortTipe=${form['sortTipe'].value}`;
    if (form['positionId'].value !== "Empty") {
      queryString = `${queryString}&positionId=${form['positionId'].value}`
    }
    if (form['cityId'].value !== "Empty") {
      queryString = `${queryString}&cityId=${form['cityId'].value}`
    }
    getReviewsFilter(queryString).then(response => {
      setReviewsCompany(response.data);
      if ((response.data.page * 5) >= response.data.numsRows) {
        setIsLast(true);
      }
      if (parseInt(response.data.page) === 1) {
        setIsFirst(true);
      } else {
        setIsFirst(false);
      }
    }).catch(error => {
      setReviewsCompany({ numsRows: 0, page: 0, reviews: [] });
      setIsFirst(true);
      setIsLast(true);
    });
  }

  return (
    <React.Fragment>
      <Header />
      <main className="centered-container-home">
        {(!currentUserId || role === "1") && <RateCompanyLink />}

        <section className="companyDetail">
          <header className="companyTitle flexRow m-t-lg b-b">
            <img src={defaultImageCompany} alt={t("Default image company")} />
            <h2>{company.name}</h2>
          </header>

          <aside className="asideCompany b-l">
            <div className={`${classes.rating} m-l-md`}>
              {company.everage}
              <Rating
                name="overall_rating"
                id="overall_rating"
                size="large"
                value={`${company.everage}`}
                precision={0.5}
                readOnly
              />
              <span className="m-l-md">{t("Overall rating")}</span>
            </div>
            <div className={`${classes.rating} m-l-md`}>
              {company.avg_salary_valuation}
              <Rating
                name="salary_valuation"
                id="salary_valuation"
                size="small"
                value={`${company.avg_salary_valuation}`}
                precision={0.5}
                readOnly
              />
              <span className="m-l-md">{t("Salary")}</span>
            </div>
            <div className={`${classes.rating} m-l-md`}>
              {company.avg_inhouse_training}
              <Rating
                name="inhouse_training"
                id="inhouse_training"
                size="small"
                value={`${company.avg_inhouse_training}`}
                precision={0.5}
                readOnly
              />
              <span className="m-l-md"> {t("Internal training")}</span>
            </div>
            <div className={`${classes.rating} m-l-md`}>
              {company.avg_growth_opportunities}
              <Rating
                name="growth_opportunities"
                id="growth_opportunities"
                size="small"
                value={`${company.avg_growth_opportunities}`}
                precision={0.5}
                readOnly
              />
              <span className="m-l-md">{t("Growth opportunities")}</span>
            </div>
            <div className={`${classes.rating} m-l-md`}>
              {company.avg_work_enviroment}
              <Rating
                name="work_enviroment"
                id="work_enviroment"
                size="small"
                value={`${company.avg_work_enviroment}`}
                precision={0.5}
                readOnly
              />
              <span className="m-l-md">{t("Work environment")}</span>
            </div>
            <div className={`${classes.rating} m-l-md`}>
              {company.avg_personal_life}
              <Rating
                name="personal_life"
                id="personal_life"
                size="small"
                value={`${company.avg_personal_life}`}
                precision={0.5}
                readOnly
              />
              <span className="m-l-md">{t("Work&Life balance")}</span>
            </div>
            <section>
              <h5 className="m-l-md m-t-lg">
                {t("Average salary")} {company.avg_salary ? company.avg_salary : "--"} €/{t("month")}
              </h5>
            </section>

            <section>
              <h5 className="m-l-md m-t-lg"> {company.name} </h5>
              <p className="m-l-md">{company.sector}</p>
              <p className="m-l-md">
                <textarea value={company.description} readOnly />
              </p>
              <p className="m-l-md">
                {company.address} - {company.sede_name}
              </p>
              <p><a href={company.url_web} className="m-l-md">{company.url_web}</a></p>
              <p><a href={company.linkedin} className="m-l-md">{company.linkedin}</a></p>
            </section>
            {dataPositionDiagram &&
              (<section className="m-l-md m-t-lg">
                <div style={{ width: 400 }}>
                  <Chart type='doughnut' data={dataPositionDiagram} />
                </div>
              </section>
              )
            }
            {dataSalaryDiagram &&
              (<section className="m-t-lg">
                <div style={{ width: 800 }}>
                  <Chart type='bar' data={dataSalaryDiagram} options={options} />
                </div>
              </section>
              )
            }
          </aside>

          <main className="ratingCompany">
            <form ref={formFiltros} onSubmit={handleSubmit(handleCompanySearch)} noValidate>
              <fieldset >
                <legend>
                  <h4>{t("Search for")}</h4>
                </legend>
                <span className="flexRow">
                  <select name="positionId" id="positionId" className="m-r-xs" ref={register}>
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
              <fieldset>
                <legend>
                  <h4>{t("Sort by")}</h4>
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
                className="btn"
                disabled={formState.isSubmitting}
              >
                {t("Find")}
              </button>
            </form>

            <section>
              <ListReviews
                pathLocation={location.pathname}
                listReviews={reviewsCompany.reviews}
              />
              <div>
                <button name="prev" id="prev" disabled={isFirst} onClick={handleClickPaging} className="m-r-md prev">{t("Previous")}</button>
                <button name="next" id="next" disabled={isLast} onClick={handleClickPaging} className="m-r-md next"> {t("Next")}</button>
              </div>
            </section>
          </main>
        </section>
      </main>
      <Footer />
    </React.Fragment >
  );
}
