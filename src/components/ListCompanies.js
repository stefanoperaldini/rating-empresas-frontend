import React from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";

import defaultImageCompany from "../img/company-default.png";

const useStyles = makeStyles({
  rating: {
    width: 200,
    display: "flex",
    alignItems: "center"
  }
});

export function ListCompanies({ listCompanies }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();

  if (listCompanies.length === 0) {
    return (
      <p className="containerGrid f-s-l">{t("No companies yet")}</p>
    );
  }

  return (
    <ul className="containerGrid">
      {listCompanies.map(company => (
        <li
          key={company.company_id}
          className="m-b-md borderGrey cursorPointer"
          onClick={e => history.push(`/company/detail/${company.company_id}`)}
        >
          <article className="summaryCompany">
            <img
              className="item1"
              height="75"
              src={company.url_logo ? company.url_logo : defaultImageCompany}
              alt={
                company.url_logo
                  ? t("Image company")
                  : t("Default image company")
              }
            />
            <span className="item2">
              <h3 className="p-t-md">{company.name}</h3>
            </span>
            {/* <p> {company.sector}</p> */}
            <div className={`${classes.rating} item3`}>
              {company.everage}
              <Rating
                name={company.name}
                id={company.name}
                size="large"
                value={company.everage}
                precision={0.5}
                readOnly
              />
              <span className="item4">{company.n_review}</span>
              <span className="item5">{t("reviews")}</span>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
