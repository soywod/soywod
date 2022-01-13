import {GetStaticPaths} from "next";
import i18n from "i18next";
import {initReactI18next, useSSR, useTranslation} from "react-i18next";

import homeEn from "../home/translations/en.json";
import homeFr from "../home/translations/fr.json";

export type Lang = "en" | "fr";
export const langs: Lang[] = ["en", "fr"];

export const resources = {
  en: {
    home: homeEn,
  },
  fr: {
    home: homeFr,
  },
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: langs.map(lang => ({params: {lang}})),
    fallback: false,
  };
};

export function useTranslations(lang: Lang, ns: string) {
  useSSR(resources, lang);
  const {t} = useTranslation(ns);
  return t;
}

i18n.use(initReactI18next).init({
  resources,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
