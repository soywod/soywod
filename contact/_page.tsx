import {FC, useState} from "react";
import {GetStaticProps} from "next";

import SEO from "../_shared/seo";
import IconDown from "../_shared/icon-down";
import {LangProps, parseLang, useI18n} from "../_shared/i18n";
import cs from "./_page.module.scss";

const title = "Clément DOUIN | Me contacter";
const desc = "Avec 5 ans d'expérience en JavaScript (React), je vous accompagne dans votre évolution numérique.";
const tags = "clément,douin,soywod,développement,développeur,web,disponible,paris,freelance,indépendant,tarif";

export type ContactPageProps = LangProps;

export const ContactPage: FC<ContactPageProps> = ({lang}) => {
  const {t} = useI18n(lang, "contact");

  const [isEmailVisible, setEmailVisible] = useState(false);
  const [isPhoneVisible, setPhoneVisible] = useState(false);

  function showEmail(evt: React.MouseEvent<HTMLAnchorElement>) {
    evt.preventDefault();
    setEmailVisible(true);
  }

  function showPhone(evt: React.MouseEvent<HTMLAnchorElement>) {
    evt.preventDefault();
    setPhoneVisible(true);
  }

  return (
    <>
      <SEO title={title} desc={desc} tags={tags} />
      <h1>{t("title")}</h1>
      <table className={cs.table}>
        <thead>
          <tr>
            <th>{t("per-hour")}</th>
            <th>{t("per-day")}</th>
            <th>{t("per-service")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>100 €</td>
            <td>700 €</td>
            <td>{t("on-estimate")}</td>
          </tr>
        </tbody>
      </table>
      <p>
        {t("p-1")} (
        {isEmailVisible ? (
          <a href="mailto:clement.douin@posteo.net">clement.douin@posteo.net</a>
        ) : (
          <a href="/contact" onClick={showEmail}>
            {t("reveal")}
          </a>
        )}
        ){t("p-2")} (
        {isPhoneVisible ? (
          <a href="tel:+33 6 30 34 35 47">+33 6 30 34 35 47</a>
        ) : (
          <a href="/contact" onClick={showPhone}>
            {t("reveal")}
          </a>
        )}
        ) {t("p-3")}
        <IconDown className={cs.icon} />
      </p>
    </>
  );
};

export const getStaticProps: GetStaticProps = ctx => {
  const lang = parseLang(ctx?.params?.lang);
  return {props: {lang}};
};

export default ContactPage;
