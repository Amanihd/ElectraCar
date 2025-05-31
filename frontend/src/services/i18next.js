import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../localization/en.json";
import ar from "../localization/ar.json";

export const languageResources = {
  en: { translation: en },
  ar: { translation: ar },
};

i18next.use(initReactI18next).init({
  compatibilityJSON: "v3",
  lng: "en", //default
  fallbackLng: "en", //if any error I make it back to en
  resources: languageResources,
});

export default i18next;
