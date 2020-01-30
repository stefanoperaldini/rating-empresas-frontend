import React, { useState, useEffect } from "react";
import i18n from "i18next";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { getReviewUserList } from "../http/reviewUserListService";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

/**
 * Page for user reviews
 */

export function ReviewUser() {
  const history = useHistory();
  const { accessToken, role, currentUserId } = useAuth();
  const [reviewUserList, setReviewUserList] = useState(null);

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
      <main className="scroll userReview">
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
                </main>
                <aside>
                  <p>
                    {i18n.t("Overall rating")}: {review.salary_valuation}
                  </p>
                  <p>
                    {i18n.t("Salary")}: {review.salary_valuation}
                  </p>
                  <p>
                    {i18n.t("Internal training")}: {review.inhouse_training}
                  </p>
                  <p>
                    {i18n.t("Growth opportunities")}:
                    {review.growth_opportunities}
                  </p>
                  <p>
                    {i18n.t("Work environment")}: {review.work_enviroment}
                  </p>
                  <p>
                    {i18n.t("Work&Life balance")}: {review.personal_life}
                  </p>
                </aside>
              </article>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </React.Fragment>
  );
}
