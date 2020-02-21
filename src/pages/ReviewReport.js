import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { getReview } from "../http/reviewService";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ListReviews } from "../components/ListReviews";
import { DotsYellow } from "../components/AppLottie";

/**
 * Page for admin delete review
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

  return (
    <React.Fragment>
      <Header />
      <main className="centered-container">
        <h1 className="f-s-l">{t("Reported review")}</h1>
        {!reviewUserList ? (
          <div className="flexRow">
            <DotsYellow />
          </div>
        ) :
          (
            <ListReviews
              listReviews={[reviewUserList]}
            />
          )
        }
      </main>
      <Footer />
    </React.Fragment>
  );
}
