import React from "react";
import { useTranslation } from "react-i18next";

import imageGitHub from "../img/GitHub-Mark-32px.png";
import { AboutUs } from "./About";
import { ContactUs } from "./Contact";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="page-footer">
      <ul>
        <li>
          <a href="https://github.com/stefanoperaldini/rating-empresas-frontend">
            {" "}
            <img src={imageGitHub} alt={t("Icon gitHub")} />
          </a>
        </li>
        <li>{<AboutUs />}</li>
        <li>{<ContactUs />}</li>
      </ul>
      <small>&copy; 2020 WORKPLACE</small>
    </footer>
  );
}
