import React from "react";
import { useHistory, } from "react-router-dom";
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

    return (
        <ul className="containerGrid m-t-lg">
            {listCompanies.map(company => (
                <li key={company.id} className="borderGrey cursorPointer"
                    onClick={e => history.push(`/company/detail/${company.id}`)}>
                    <article className="summaryCompany">
                        <img className="item1"
                            src={defaultImageCompany}
                            alt={t("Default image company")}
                        />
                        <h4>{company.name}</h4>
                        <p> {company.sector}</p>
                        <div className={`${classes.rating} item2 f-s-xs`}>
                            <Rating
                                name={company.name}
                                id={company.name}
                                size="large"
                                value="4"
                                precision={1}
                                readOnly={true}
                                className="m-r-md"
                            />
                            100 {t("reviews")}
                        </div>
                    </article>
                </li>
            ))}
        </ul>
    );
}