import React, { useState, useEffect } from "react";
import i18n from "i18next";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

import { Cities } from "../components/Cities";

export function ReviewCreate() {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const langStored = localStorage.getItem("re:lang");
    if (langStored) {
      setLang(langStored);
    } else {
      let userLang = navigator.language || navigator.userLanguage;
      if (userLang) {
        userLang = userLang.substring(0, 2);
        switch (userLang) {
          case "es":
          case "it":
          case "en":
            setLang(userLang);
            break;
          default:
            setLang("en");
            break;
        }
      } else {
        setLang("en");
      }
    }
  }, []);

  i18n.changeLanguage(lang);
  return (
    <React.Fragment>
      <Header />
      <main>
        <fieldset>
          <ul>
            <li>
              <label>
                English
              <input
                  type="radio"
                  name="language"
                  value="en"
                  checked={lang === "en"}
                  onChange={e => {
                    setLang(e.target.value);
                    localStorage.setItem("re:lang", "en");
                  }}
                />
              </label>
            </li>
            <li>
              <label>
                Spanish
              <input
                  type="radio"
                  name="language"
                  value="es"
                  checked={lang === "es"}
                  onChange={e => {
                    setLang(e.target.value);
                    localStorage.setItem("re:lang", "es");
                  }}
                />
              </label>
            </li>
            <li>
              <label>
                Italian
              <input
                  type="radio"
                  name="language"
                  value="it"
                  checked={lang === "it"}
                  onChange={e => {
                    setLang(e.target.value);
                    localStorage.setItem("re:lang", "it");
                  }}
                />
              </label>
            </li>
          </ul>
        </fieldset>
        <Cities />
      </main>
      <Footer />
    </React.Fragment>
  );
}
