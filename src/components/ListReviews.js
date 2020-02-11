import React from "react";
import { useHistory, } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";

import { useAuth } from "../context/auth-context";
import { reportReview, deleteReview } from "../http/reviewService"
import denounceReviewImg from "../img/denounce.png";
import deleteReviewImg from "../img/delete.png";

const useStyles = makeStyles({
    rating: {
        width: 200,
        display: "flex",
        alignItems: "center"
    }
});

export function ListReviews({ pathLocation, listReviews }) {
    const classes = useStyles();
    const { currentUserId, role } = useAuth();
    const { t } = useTranslation();
    const history = useHistory();

    const executeReport = (reviewId) => {
        const sendEmail = window.confirm(t("Do you want to report this review?"));
        if (sendEmail) {
            return reportReview(reviewId)
                .then(response => {
                    // FIXME tengo que quedar en esta pagina
                    history.push("/home");
                });
        }
    };

    const executeDelete = (reviewId) => {
        const deleteReviewConfirm = window.confirm(t("Do you want to delete this review?"));
        if (deleteReviewConfirm) {
            return deleteReview(reviewId)
                .then(response => {
                    // FIXME tengo que quedar en esta pagina
                    history.push("/home");
                });
        }
    };

    return (
        <ul className="flexColumn">
            {listReviews.map(review => (
                <li key={review.id} className="b-b m-t-lg">
                    <section>
                        <header>
                            <ul>
                                <li>{review.company_name && (<strong>{review.company_name}</strong>)}</li>
                                <li>{review.name}</li>
                                <li>{review.start_year} - {review.end_year ? (<span>{review.end_year}</span>) : (<span>{t("today")}</span>)}</li>
                                <li>{review.city_name}</li>
                                <li>{review.created_at}</li>
                            </ul>
                        </header>
                        <main>
                            <h5>{review.comment_title}</h5>
                            <textarea value={review.comment}></textarea>
                            <div className={classes.rating}>
                                <Rating
                                    name={review.id["overall_rating"]}
                                    id={review.id["overall_rating"]}
                                    size="large"
                                    value="4"
                                    precision={1}
                                    readOnly={true}
                                />
                                <span className="m-l-md">{t("Overall rating")}</span>
                            </div>
                            <div className={classes.rating}>
                                <Rating
                                    name={review.id["salary_valuation"]}
                                    id={review.id[" salary_valuation"]}
                                    size="small"
                                    value={review.salary_valuation}
                                    precision={1}
                                    readOnly={true}
                                />
                                <span className="m-l-md">{t("Salary")}</span>
                            </div>
                            <div className={classes.rating}>
                                <Rating
                                    name={review.id["inhouse_training"]}
                                    id={review.id[" inhouse_training"]}
                                    size="small"
                                    value={review.inhouse_training}
                                    precision={1}
                                    readOnly={true}
                                />
                                <span className="m-l-md"> {t("Internal training")}</span>
                            </div>
                            <div className={classes.rating}>
                                <Rating
                                    name={review.id["growth_opportunities"]}
                                    id={review.id["growth_opportunities"]}
                                    size="small"
                                    value={review.growth_opportunities}
                                    precision={1}
                                    readOnly={true}
                                />
                                <span className="m-l-md">{t("Growth opportunities")}</span>
                            </div>
                            <div className={classes.rating}>
                                <Rating
                                    name={review.id["work_enviroment"]}
                                    id={review.id["work_enviroment"]}
                                    size="small"
                                    value={review.work_enviroment}
                                    precision={1}
                                    readOnly={true}
                                />
                                <span className="m-l-md">{t("Work environment")}</span>
                            </div>
                            <div className={classes.rating}>
                                <Rating
                                    name={review.id["personal_life"]}
                                    id={review.id["personal_life"]}
                                    size="small"
                                    value={review.personal_life}
                                    precision={1}
                                    readOnly={true}
                                />
                                <span className="m-l-md">{t("Work&Life balance")}</span>
                            </div>

                            {currentUserId && role !== "0" && (
                                <React.Fragment>
                                    <img src={denounceReviewImg} alt={t("Icon for reporting a review")} />
                                    <a
                                        href="/"
                                        title={t("Link for sending e-mail to the web administrator")}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            executeReport(review.id)
                                        }}
                                    >
                                        {t("Report")}
                                    </a>
                                </React.Fragment>
                            )}

                            {currentUserId && role === "0" && (
                                <React.Fragment>
                                    <img src={deleteReviewImg} alt={t("Icon for delete a review")} />
                                    <a href="/"
                                        title={t("Link for deleting a review")}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            executeDelete(review.id)
                                        }}
                                    >
                                        {t("Delete")}
                                    </a>
                                </React.Fragment>
                            )}
                        </main>
                    </section>
                </li>
            ))}
        </ul>

    );
}