import React from "react";
import { useTranslation } from "react-i18next";

import imageGitHub from "../img/GitHub-Mark-32px.png";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="page-footer">
      <ul>
        <li>
          <a href="https://github.com/stefanoperaldini/rating-empresas-frontend" target="_blank"> <img
            src={imageGitHub}
            alt={t("Icon gitHub")}
          /></a>
        </li>
        <li>
          <a href="/">{t("About")}</a>
        </li>
        <li>
          <a href="/">{t("Contact")}</a>
        </li>
      </ul>
      <small>&copy; 2020 WORKPLACE</small>
    </footer>
  );
}