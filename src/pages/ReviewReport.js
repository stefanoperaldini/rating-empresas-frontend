import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { useLocation } from "react-router-dom";

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

    const location = useLocation();

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
                <h3>{t("Reported review")}</h3>
                <ListReviews pathLocation={location.pathname} listReviews={[reviewUserList]} />
            </main>
            <Footer />
        </React.Fragment>
    );
}
