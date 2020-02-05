import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";
import denounceReview from "../img/denounce.png";
import deleteReview from "../img/delete.png";

import { getReviewUserList } from "../http/reviewService";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

/**
 * Page for user reviews
 */

const useStyles = makeStyles({
  rating: {
    width: 200,
    display: "flex",
    alignItems: "center"
  }
});

export function ReviewUser() {
  const [reviewUserList, setReviewUserList] = useState(null);
  const classes = useStyles();
  const { t } = useTranslation();

  useEffect(() => {
    getReviewUserList().then(response => {
      setReviewUserList(response.data);
    });
    return;
  }, []);

  if (reviewUserList === null) {
    return (
      <div>
        <h3>{t("You don't have any review")}</h3>
      </div>
    );
  }

  return (
    <React.Fragment>
      <Header />
      <main>
        <h3>{t("My reviews")}</h3>
        <ul className="review-list">
          {reviewUserList.map(review => (
            <li key={review.id}>
              <article>
                <header className="box-header">
                  <p>
                    {review.company_name}, {review.name} ({review.start_year} -
                    {review.end_year}) - {review.city_name}. {review.created_at}
                  </p>
                </header>
                <main>
                  <h5>{review.comment_title}</h5>
                  <textarea>{review.comment}</textarea>
                  <div className={classes.rating}>
                    <span>{t("Overall rating")}</span>
                    <Rating
                      name={review.id["overall_rating"]}
                      id={review.id["overall_rating"]}
                      size="large"
                      value="4"
                      precision={1}
                      readOnly={true}
                    />
                  </div>
                  <div className={classes.rating}>
                    <span>{t("Salary")}</span>
                    <Rating
                      name={review.id["salary_valuation"]}
                      id={review.id[" salary_valuation"]}
                      size="small"
                      value={review.salary_valuation}
                      precision={1}
                      readOnly={true}
                    />
                  </div>
                  <div className={classes.rating}>
                    <span> {t("Internal training")}</span>
                    <Rating
                      name={review.id["inhouse_training"]}
                      id={review.id[" inhouse_training"]}
                      size="small"
                      value={review.inhouse_training}
                      precision={1}
                      readOnly={true}
                    />
                  </div>
                  <div className={classes.rating}>
                    <span>{t("Growth opportunities")}</span>
                    <Rating
                      name={review.id["growth_opportunities"]}
                      id={review.id["growth_opportunities"]}
                      size="small"
                      value={review.growth_opportunities}
                      precision={1}
                      readOnly={true}
                    />
                  </div>
                  <div className={classes.rating}>
                    <span>{t("Work environment")}</span>
                    <Rating
                      name={review.id["work_enviroment"]}
                      id={review.id["work_enviroment"]}
                      size="small"
                      value={review.work_enviroment}
                      precision={1}
                      readOnly={true}
                    />
                  </div>
                  <div className={classes.rating}>
                    <span>{t("Work&Life balance")}</span>
                    <Rating
                      name={review.id["personal_life"]}
                      id={review.id["personal_life"]}
                      size="small"
                      value={review.personal_life}
                      precision={1}
                      readOnly={true}
                    />
                  </div>
                </main>
              </article>
            </li>
          ))}
        </ul>
        <img src={denounceReview} alt={t("Icon for denounce a review")} />
        <a
          href="/"
          title={t("Link for sending e-mail to the web administrator")}
        >
          {t("Denounce")}
        </a>
        <img src={deleteReview} alt={t("Icon for delete a review")} />
        <a href="/" title={t("Link for deleting a review")}>
          {t("Delete")}
        </a>
      </main>
      <Footer />
    </React.Fragment>
  );
}
