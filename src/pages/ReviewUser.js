import React, { useState, useEffect } from "react";
import i18n from "i18next";
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';

import { getReviewUserList } from "../http/reviewUserListService";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

/**
 * Page for user reviews
 */

const useStyles = makeStyles({
  rating: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
  },
});

export function ReviewUser() {
  const [reviewUserList, setReviewUserList] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    getReviewUserList().then(response => {
      setReviewUserList(response.data);
    });
    return;
  }, []);

  if (reviewUserList === null) {
    return (
      <div>
        <h3>{i18n.t("You don't have any review")}</h3>
      </div>
    );
  }

  return (
    <React.Fragment>
      <Header />
      <main>
        <h3>{i18n.t("My reviews")}</h3>
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
                    <span>{i18n.t("Overall rating")}</span>
                    <Rating
                      name="overall_rating"
                      id="overall_rating"
                      size="large"
                      value="4"
                      precision={1}
                      readOnly={true}
                    />
                  </div>
                  <div className={classes.rating}>
                    <span>{i18n.t("Salary")}</span>
                    <Rating
                      name="salary_valuation"
                      id="salary_valuation"
                      size="small"
                      value={review.salary_valuation}
                      precision={1}
                      readOnly={true}
                    />
                  </div>
                  <div className={classes.rating}>
                    <span> {i18n.t("Internal training")}</span>
                    <Rating
                      name="inhouse_training"
                      id="inhouse_training"
                      size="small"
                      value={review.inhouse_training}
                      precision={1}
                      readOnly={true}
                    />
                  </div>
                  <div className={classes.rating}>
                    <span>{i18n.t("Growth opportunities")}</span>
                    <Rating
                      name="growth_opportunities"
                      id="growth_opportunities"
                      size="small"
                      value={review.growth_opportunities}
                      precision={1}
                      readOnly={true}
                    />
                  </div>
                  <div className={classes.rating}>
                    <span>{i18n.t("Work environment")}</span>
                    <Rating
                      name="review.work_enviroment"
                      id="review.work_enviroment"
                      size="small"
                      value={review.work_enviroment}
                      precision={1}
                      readOnly={true}
                    />
                  </div>
                  <div className={classes.rating}>
                    <span>{i18n.t("Work&Life balance")}</span>
                    <Rating
                      name="personal_life"
                      id="personal_life"
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
      </main>
      <Footer />
    </React.Fragment>
  );
}
