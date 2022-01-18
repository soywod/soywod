import {GetStaticPaths} from "next";
import i18n from "i18next";
import {initReactI18next, useSSR, useTranslation} from "react-i18next";

import homeEn from "../home/_page-en.json";
import homeFr from "../home/_page-fr.json";

export const resources = {
  en: {
    home: homeEn,
  },
  fr: {
    home: homeFr,
  },
};

export type Lang = keyof typeof resources;
export type LangProps = {lang: Lang};
export const langs = Object.keys(resources) as Array<Lang>;

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: langs.map(lang => ({params: {lang}})),
    fallback: false,
  };
};

export function useI18n(lang: Lang, ns: string) {
  useSSR(resources, lang);
  return useTranslation(ns, {useSuspense: false});
}

export function parseLang(str: any): Lang {
  switch (str) {
    case "fr":
      return str;
    case "en":
    default:
      return "en";
  }
}

i18n.use(initReactI18next).init({
  resources,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
