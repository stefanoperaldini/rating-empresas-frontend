import React from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";

import { useAuth } from "../context/auth-context";
import { reportReview, deleteReview } from "../http/reviewService";
import denounceReviewImg from "../img/denounce.png";
import deleteReviewImg from "../img/delete.png";

const useStyles = makeStyles({
  rating: {
    // width: 348,
    display: "flex",
    alignItems: "flex-start"
  }
});

export function ListReviews({ listReviews, onReviewDeleted = null }) {
  const classes = useStyles();
  const { currentUserId, role } = useAuth();
  const { t } = useTranslation();
  const history = useHistory();

  const executeReport = reviewId => {
    const sendEmail = window.confirm(t("Do you want to report this review?"));
    if (sendEmail) {
      return reportReview(reviewId).then(response => {
        return;
      });
    }
  };

  const executeDelete = reviewId => {
    const deleteReviewConfirm = window.confirm(
      t("Do you want to delete this review?")
    );
    if (deleteReviewConfirm) {
      return deleteReview(reviewId).then(response => {
        if (!onReviewDeleted) {
          // if from admin ReviewReport, go to home
          history.push("/home");
          return;
        }
        // render origin page
        onReviewDeleted(reviewId);
        return;
      });
    }
  };

  if (listReviews.length === 0) {
    return <h2>{t("No reviews")}</h2>;
  }

  return (
    <ul>
      {listReviews.map(review => (
        <li key={review.id} className="b-bog p-b-sm m-t-lg">
          <section>
            <header>
              <ul>
                <li className="f-s-m">
                  {review.company_name && (
                    <strong>{review.company_name}</strong>
                  )}
                </li>
                <li className="f-c-fourgray">
                  {review.name} - ({review.start_year} -{" "}
                  {review.end_year ? (
                    <span>{review.end_year}</span>
                  ) : (
                    <span>{t("today")}</span>
                  )}
                  ) - {review.city_name}
                </li>
                <li className="f-c-fourgray f-s-xs">
                  {t("Review date")}: {review.created_at}
                </li>
              </ul>
            </header>
            <main>
              <h1 className="f-s-sm p-t-sm">{review.comment_title}</h1>
              <textarea
                className="f-s-sm m-b-md"
                value={review.comment}
                readOnly
              ></textarea>
              <div className={classes.rating}>
                {review.everage}
                <Rating
                  name={review.id["overall_rating"]}
                  id={review.id["overall_rating"]}
                  size="large"
                  value={parseFloat(review.everage)}
                  precision={0.5}
                  readOnly
                  className="m-l-xs"
                />
                <span className="m-l-md">{t("Overall rating")}</span>
              </div>
              <div className={classes.rating}>
                {review.salary_valuation}
                <Rating
                  name={review.id["salary_valuation"]}
                  id={review.id[" salary_valuation"]}
                  size="small"
                  value={parseInt(review.salary_valuation)}
                  precision={0.5}
                  readOnly
                  className="m-l-sm"
                />
                <span className="m-l-md">{t("Salary")}</span>
              </div>
              <div className={classes.rating}>
                {review.inhouse_training}
                <Rating
                  name={review.id["inhouse_training"]}
                  id={review.id[" inhouse_training"]}
                  size="small"
                  value={parseInt(review.inhouse_training)}
                  precision={0.5}
                  readOnly
                  className="m-l-sm"
                />
                <span className="m-l-md"> {t("Internal training")}</span>
              </div>
              <div className={classes.rating}>
                {review.growth_opportunities}
                <Rating
                  name={review.id["growth_opportunities"]}
                  id={review.id["growth_opportunities"]}
                  size="small"
                  value={parseInt(review.growth_opportunities)}
                  precision={0.5}
                  readOnly
                  className="m-l-sm"
                />
                <span className="m-l-md">{t("Growth opportunities")}</span>
              </div>
              <div className={classes.rating}>
                {review.work_enviroment}
                <Rating
                  name={review.id["work_enviroment"]}
                  id={review.id["work_enviroment"]}
                  size="small"
                  value={parseInt(review.work_enviroment)}
                  precision={0.5}
                  readOnly
                  className="m-l-sm"
                />
                <span className="m-l-md">{t("Work environment")}</span>
              </div>
              <div className={classes.rating}>
                {review.personal_life}
                <Rating
                  name={review.id["personal_life"]}
                  id={review.id["personal_life"]}
                  size="small"
                  value={parseInt(review.personal_life)}
                  precision={0.5}
                  readOnly
                  className="m-l-sm"
                />
                <span className="m-l-md">{t("Work&Life balance")}</span>
              </div>

              {currentUserId &&
                review.user_id !== currentUserId &&
                role !== "0" && (
                  <React.Fragment>
                    <div className="reporting">
                      <img
                        className="p-t-md"
                        src={denounceReviewImg}
                        alt={t("Icon for reporting a review")}
                      />
                      <a
                        className="f-c-fourgray m-l-sm m-r-md p-t-md"
                        href="/"
                        title={t(
                          "Link for sending e-mail to the web administrator"
                        )}
                        onClick={e => {
                          e.preventDefault();
                          executeReport(review.id);
                        }}
                      >
                        {t("Report")}
                      </a>
                    </div>
                  </React.Fragment>
                )}

              {currentUserId && role === "0" && (
                <React.Fragment>
                  <div className="reporting">
                    <img
                      className="p-t-md"
                      src={deleteReviewImg}
                      alt={t("Icon for delete a review")}
                    />
                    <a
                      className="f-c-ko m-l-sm m-r-md p-t-md"
                      href="/"
                      title={t("Link for deleting a review")}
                      onClick={e => {
                        e.preventDefault();
                        executeDelete(review.id);
                      }}
                    >
                      {t("Delete")}
                    </a>
                  </div>
                </React.Fragment>
              )}
            </main>
          </section>
        </li>
      ))}
    </ul>
  );
}
