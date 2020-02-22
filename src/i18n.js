import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEn from "./locales/en/translation.json";
import translationEs from "./locales/es/translation.json";
import translationIt from "./locales/it/translation.json";
import translationGl from "./locales/gl/translation.json"

i18n
    .use(initReactI18next)
    .init({
        debug: false,
        lng: "en",
        fallbackLng: "en", // use en if detected lng is not available

        keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false // react already safes from xss
        },

        resources: {
            en: {
                translations: translationEn
            },
            es: {
                translations: translationEs
            },
            it: {
                translations: translationIt
            },
            gl: {
                translations: translationGl
            },
        },
        // have a common namespace used around the full app
        ns: ["translations"],
        defaultNS: "translations",
    });

export default i18n;