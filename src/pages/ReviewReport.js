import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

import { getReview } from "../http/reviewService";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ListReviews } from "../components/ListReviews";

/**
 * Page for user reviews
 */

export function ReviewReport() {
  const [reviewUserList, setReviewUserList] = useState(null);
  const { t } = useTranslation();
  const params = useParams();
  const idReview = params.idReview;


  useEffect(() => {
    getReview(idReview).then(response => {
      setReviewUserList(response.data);
    });
    return;
  }, [idReview]);

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
        <h1 className="f-s-l">{t("Reported review")}</h1>
        <ListReviews
          listReviews={[reviewUserList]}
        />
      </main>
      <Footer />
    </React.Fragment>
  );
}
