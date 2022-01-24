import {FC, useState} from "react";

import SEO from "../_shared/seo";
import IconDown from "../_shared/icon-down";
import cs from "./_page.module.scss";
import {GetStaticProps} from "next";
import {parseLang} from "../_shared/i18n";

const title = "Clément DOUIN | Me contacter";
const desc = "Avec 5 ans d'expérience en JavaScript (React), je vous accompagne dans votre évolution numérique.";
const tags = "clément,douin,soywod,développement,développeur,web,disponible,paris,freelance,indépendant,tarif";

const ContactPage: FC = () => {
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
      <h1>Recrutez-moi !</h1>
      <table className={cs.table}>
        <thead>
          <tr>
            <th>Par heure</th>
            <th>Par jour</th>
            <th>Par prestation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>100 €</td>
            <td>700 €</td>
            <td>Sur devis</td>
          </tr>
        </tbody>
      </table>
      <p>
        Pour plus d'informations, n'hésitez pas à me contacter par mail (
        {isEmailVisible ? (
          <a href="mailto:clement.douin@posteo.net">clement.douin@posteo.net</a>
        ) : (
          <a href="/contact" onClick={showEmail}>
            AFFICHER
          </a>
        )}
        ), par téléphone (
        {isPhoneVisible ? (
          <a href="tel:+33 6 30 34 35 47">+33 6 30 34 35 47</a>
        ) : (
          <a href="/contact" onClick={showPhone}>
            AFFICHER
          </a>
        )}
        ) ou via l'un des réseaux sociaux situés juste en dessous
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
