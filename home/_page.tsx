import React, {FC} from "react";
import {GetStaticProps} from "next";
import {DateTime} from "luxon";

import Link from "../_shared/link";
import SEO from "../_shared/seo";
import {useI18n, LangProps, parseLang} from "../_shared/i18n";

export type HomePageProps = LangProps;

export const HomePage: FC<HomePageProps> = ({lang}) => {
  const {t} = useI18n(lang, "home");

  const now = DateTime.local();
  const yearsOld = Math.trunc(now.diff(DateTime.fromISO("1990-02-02", {locale: "fr"}), "years").years);
  const yearsJSExp = Math.trunc(now.diff(DateTime.fromISO("2015-01-01", {locale: "fr"}), "years").years);
  const yearsDevExp = Math.trunc(now.diff(DateTime.fromISO("2010-01-01", {locale: "fr"}), "years").years);

  return (
    <>
      <SEO title={t("seo-title")} desc={t("seo-desc")} tags={t("seo-tags")} />
      <h1>Hello, world!</h1>
      <hr />
      <p dangerouslySetInnerHTML={{__html: t("p-1", {yearsOld, yearsJSExp})}} />
      <p>{t("p-2", {yearsDevExp})}</p>
      <p>
        {t("p-3-1")} <Link to={`/${lang}/contact`}>{t("p-3-contact-link-text")}</Link> {t("p-3-2")}
      </p>
    </>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = ctx => {
  const lang = parseLang(ctx?.params?.lang);
  return {props: {lang}};
};

export default HomePage;
