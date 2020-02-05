import React from "react";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t, i18n } = useTranslation();
  return (
    <footer className="footer">
      <p>{t("About")}</p>
      <p>{t("Contact")}</p>
      <p>&copy; 2020 Rating Empresas</p>
    </footer>
  );
}
