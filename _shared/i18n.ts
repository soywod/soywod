import {GetStaticPaths} from "next";
import i18n from "i18next";
import {initReactI18next, Namespace, useSSR, useTranslation} from "react-i18next";

import homeEn from "../home/_page-en.json";
import homeFr from "../home/_page-fr.json";
import experienceEn from "../experiences/_page-en.json";
import experienceFr from "../experiences/_page-fr.json";
import projectEn from "../projects/_page-en.json";
import projectFr from "../projects/_page-fr.json";
import contactEn from "../contact/_page-en.json";
import contactFr from "../contact/_page-fr.json";

export const resources = {
  en: {
    home: homeEn,
    experience: experienceEn,
    project: projectEn,
    contact: contactEn,
  },
  fr: {
    home: homeFr,
    experience: experienceFr,
    project: projectFr,
    contact: contactFr,
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

export function useI18n(lang: Lang, ns: Namespace) {
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
