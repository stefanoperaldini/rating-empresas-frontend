import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import { getReviewUserList } from "../http/reviewService";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ListReviews } from "../components/ListReviews";

/**
 * Page for user reviews
 */

export function ReviewUser() {
  const [reviewUserList, setReviewUserList] = useState(null);
  const { t } = useTranslation();

  const location = useLocation();

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
      <main className="centered-container">
        <h3>{t("My reviews")}</h3>
        <ListReviews pathLocation={location.pathname} listReviews={reviewUserList} />
      </main>
      <Footer />
    </React.Fragment>
  );
}
