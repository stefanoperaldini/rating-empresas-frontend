import React from "react";
import i18n from "i18next";
import { Link } from "react-router-dom";
import notfound from "../img/notfound.jpeg";
import "../css/notfound.css";

/**
 * Page route not founded
 */

export function NotFound() {
  return (
    <React.Fragment>
      <main className="centered-container">
        <aside>
          <img src={notfound} alt="page not found" />
        </aside>
        <h2>{i18n.t("Page not found")}</h2>
        <p>
          {" "}
          {i18n.t(
            "Something went wrong and we cant find the page you are looking for."
          )}{" "}
        </p>
        <Link to="/Home">{i18n.t("Home")}</Link>
      </main>
    </React.Fragment>
  );
}
