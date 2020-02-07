import React from "react";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer class="page-footer">
      <ul>
        <li>
          <a href="/">{t("About")}</a>

        </li>
        <li>
          <a href="/">{t("Contact")}</a>
        </li>
      </ul>
      <small>&copy; 2020 Rating Empresas</small>
    </footer>
  );
}