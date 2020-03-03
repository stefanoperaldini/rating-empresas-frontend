import React from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  rating: {
    display: "flex",
    alignItems: "center"
  }
});

export function RateCompanyLink() {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <section className="allWidth centeredComponentRate p-b-md">
      <header>
        <h2 className="f-s-l txtCenter">
          {t("Do you want to rate a company?")}
        </h2>
        <p className="txtCenter">{t("Your reviews will be anonymous")}</p>
      </header>
      <Rating
        className={classes.rating}
        name="vote"
        size="large"
        value={3}
        precision={1}
        onChange={() => {
          history.push("/review/create");
        }}
      />
    </section>
  );
}
