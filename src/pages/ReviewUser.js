import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { getReviewUserList } from "../http/reviewService";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ListReviews } from "../components/ListReviews";
import { DotsYellow } from "../components/AppLottie";

/**
 * Page for user reviews
 */

export function ReviewUser() {
  const [reviewUserList, setReviewUserList] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    getReviewUserList().then(response => {
      setReviewUserList(response.data);
    }).catch(error => {
      setReviewUserList([]);
    });
    return;
  }, []);

  return (
    <React.Fragment>
      <Header />
      <main className="centered-container">
        <h1 className="f-s-l">{t("My reviews")}</h1>
        {!reviewUserList ?
          (
            <div className="flexRow">
              <DotsYellow />
            </div>
          ) :
          (
            <ListReviews listReviews={reviewUserList} />
          )
        }
      </main>
      <Footer />
    </React.Fragment>
  );
}
