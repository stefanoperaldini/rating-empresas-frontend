import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import admin from "../img/admin-user.png";
import user from "../img/user.png";
import company from "../img/company.png";
import menu from "../img/menu-black.png";

import { useAuth } from "../context/auth-context";
import { logOut } from "../http/authService";
import { setErrorMessageCallBackEnd } from "../pages/pagesUtils";

export function Header() {
  const [lang, setLang] = useState("en");
  const [showMenu, setShowMenu] = useState(false);
  const { currentUserId, role } = useAuth();

  const { t, i18n } = useTranslation();

  const executeLogout = () => {
    return logOut()
      .then(response => {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("accessToken");
      })
      .catch(error => {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("accessToken");
        console.error(setErrorMessageCallBackEnd(error));
      })
      .finally(() => {
        window.location.href = "/home";
      });
  };

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
    <header className="header">
      <Link to="/" header-item>
        <h1>Rating Empresas</h1>
      </Link>
      <ul className="header" header-item>
        <li className="header-item header-item">
          <label>
            English
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
          </label>
        </li>
        <li className="header-item">
          <label>
            Español
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
          </label>
        </li>
        <li className="header-item">
          <label>
            Italiano
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
          </label>
        </li>
        <li className="header-item">
          <label>
            Galego
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
          </label>
        </li>
      </ul>

      <p>
        {currentUserId && role === "0" && (
          <React.Fragment>
            <img src={admin} alt={t("Admin icon")} /> <span>aaa@bbb.com</span>
          </React.Fragment>
        )}
        {currentUserId && role === "1" && (
          <React.Fragment>
            <img src={user} alt={t("User icon")} /> <span>aaa@bbb.com</span>
          </React.Fragment>
        )}
        {currentUserId && role === "2" && (
          <React.Fragment>
            <img src={company} alt={t("Company icon")} />{" "}
            <span>aaa@bbb.com</span>
          </React.Fragment>
        )}
      </p>

      {!currentUserId ? (
        <nav className="header-item">
          <ul className="header">
            <li className="header-item">
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
        </nav>
      ) : role === "0" ? (
        <nav className="menu header-item" onClick={() => executeLogout()}>
          {t("Sign out")}
        </nav>
      ) : (
            <nav className="menu header-item" onClick={() => setShowMenu(true)}>
              <img src={menu} alt={t("Menu icon")} />
              {showMenu && (
                <div
                  className="m-t-lg lista-menu"
                  onMouseLeave={() => setShowMenu(false)}
                >
                  <ul>
                    {role === "2" && (
                      <li>
                        <Link to="/company/create">{t("My company")}</Link>
                      </li>
                    )}
                    {role === "1" && (
                      <React.Fragment>
                        <li>
                          <Link to="/review/create">{t("Create review")}</Link>
                        </li>
                        <li>
                          <Link to="/review/user">{t("My reviews")}</Link>
                        </li>
                      </React.Fragment>
                    )}
                    {(role === "1" || role === "2") && (
                      <React.Fragment>
                        <li>
                          <Link to="/user/update">{t("Profile")}</Link>
                        </li>
                        <li>
                          <Link to="/account/password/change">
                            {t("Change password")}
                          </Link>
                        </li>
                        <li>
                          <Link to="/user/delete">{t("Delete account")}</Link>
                        </li>
                      </React.Fragment>
                    )}
                    <li onClick={() => executeLogout()}>{t("Sign out")}</li>
                  </ul>
                </div>
              )}
            </nav>
          )}
    </header>
  );
}
