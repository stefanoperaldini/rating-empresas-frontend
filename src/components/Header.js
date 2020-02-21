import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import admin from "../img/admin-user.png";
import user from "../img/user.png";
import company from "../img/company.png";
import logo from "../img/Logo.png";
import { useAuth } from "../context/auth-context";
import { executeLogout } from "../utils";
import { AppMenu } from "../components/AppMenu";

export function Header() {
  const [lang, setLang] = useState("en");
  const { currentUserId, role, email } = useAuth();

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const langStored = localStorage.getItem("re:lang");
    if (langStored) {
      setLang(langStored);
      i18n.changeLanguage(langStored);
    } else {
      let userLang = navigator.language || navigator.userLanguage;
      if (userLang) {
        userLang = userLang.substring(0, 2);
        switch (userLang) {
          case "es":
          case "it":
          case "en":
          case "gl":
            i18n.changeLanguage(userLang);
            setLang(userLang);
            break;
          default:
            i18n.changeLanguage("en");
            setLang(userLang);
            break;
        }
      } else {
        i18n.changeLanguage("en");
        setLang(userLang);
      }
    }
  }, [lang, i18n]);

  return (
    <header className="page-header">
      <nav>
        <Link to="/" className="header-item">
          <img src={logo} alt={t("Logo app")} width="230" />
        </Link>
        <ul className="header-item f-s-xs">
          <li className="header-item">
            <label>
              <input
                type="radio"
                name="language"
                value="en"
                checked={lang === "en"}
                onChange={e => {
                  localStorage.setItem("re:lang", "en");
                  i18n.changeLanguage("en");
                  setLang("en");
                }}
              />
              <span>English</span>
            </label>
          </li>
          <li className="header-item">
            <label>
              <input
                type="radio"
                name="language"
                value="es"
                checked={lang === "es"}
                onChange={e => {
                  localStorage.setItem("re:lang", "es");
                  i18n.changeLanguage("es");
                  setLang("es");
                }}
              />
              <span>Español</span>
            </label>
          </li>
          <li className="header-item">
            <label>
              <input
                type="radio"
                name="language"
                value="it"
                checked={lang === "it"}
                onChange={e => {
                  localStorage.setItem("re:lang", "it");
                  i18n.changeLanguage("it");
                  setLang("it");
                }}
              />
              <span>Italiano</span>
            </label>
          </li>
          <li className="header-item">
            <label>
              <input
                type="radio"
                name="language"
                value="gl"
                checked={lang === "gl"}
                onChange={e => {
                  localStorage.setItem("re:lang", "gl");
                  i18n.changeLanguage("gl");
                  setLang("gl");
                }}
              />
              <span>Galego</span>
            </label>
          </li>
        </ul>
        <div className="cta-contact headerFlexRow">
          {currentUserId && role === "0" && (
            <span className="centeredComponent f-s-xs f-c-fourgray m-r-xl">
              <img src={admin} alt={t("Admin icon")} /> <span>{email}</span>
            </span>
          )}
          {currentUserId && role === "1" && (
            <span className="centeredComponent f-s-xs f-c-fourgray m-r-xl">
              <img src={user} alt={t("User icon")} /> <span>{email}</span>
            </span>
          )}
          {currentUserId && role === "2" && (
            <span className="centeredComponent f-s-xs f-c-fourgray m-r-xl">
              <img src={company} alt={t("Company icon")} /> <span>{email}</span>
            </span>
          )}
          {!currentUserId ? (
            <div className="header-item">
              <ul>
                <li className="header-item ">
                  <Link to="/account/login">
                    <p>{t("Sign in")}</p>
                  </Link>
                </li>
                <li className="header-item">
                  <Link to="/account/create">
                    <p>{t("Sign up")}</p>
                  </Link>
                </li>
              </ul>
            </div>
          ) : role === "0" ? (
            <span
              className="header-item signOut"
              onClick={() => executeLogout()}
            >
              <Link to="/">{t("Sign out")}</Link>
            </span>
          ) : (
                <AppMenu />
              )}
        </div>
      </nav>
    </header>
  );
}
