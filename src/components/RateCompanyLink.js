import React from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  rating: {
    width: "200",
    display: "flex",
    alignItems: "center"
  }
});

export function RateCompanyLink() {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <section className="allWidth centeredComponentRate p-t-md m-t-xl">
      <header>
        <h2 className="f-s-l">{t("Do you want to rate a company?")}</h2>
        <p>{t("Your reviews will be anonimous")}</p>
      </header>
      <main className={classes.rating}>
        <Rating
          name="vote"
          size="large"
          value="0"
          precision={1}
          onChange={() => {
            history.push("/review/create");
          }}
        />
      </main>
    </section>
  );
}
