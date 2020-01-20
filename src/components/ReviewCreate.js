import React, { useState, useEffect } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Cities } from "./Cities";
import i18n from "i18next";

export function ReviewCreate() {
  const [lang, setLang] = useState("en");

  console.log("fkjdgjśdkfjn");

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
      <Footer />
    </React.Fragment>
  );
}
