import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { getReviewUserList } from "../http/reviewService";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ListReviews } from "../components/ListReviews";

/**
 * Page for user reviews
 */

export function ReviewUser() {
  const [reviewUserList, setReviewUserList] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    getReviewUserList().then(response => {
      setReviewUserList(response.data);
    });
    return;
  }, []);

  return (
    <React.Fragment>
      <Header />
      <main className="centered-container">
        <h1 className="f-s-l m-t-xl m-b-md">{t("My reviews")}</h1>
        <ListReviews listReviews={reviewUserList} />
      </main>
      <Footer />
    </React.Fragment>
  );
}
