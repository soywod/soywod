import React, {FC} from "react";
import {GetStaticProps} from "next";
import {DateTime} from "luxon";

import Link from "../_shared/link";
import SEO from "../_shared/seo";
import {useTranslations, Lang} from "../_shared/i18n";

const title = "Clément DOUIN | Développeur Web Indépendant";
const desc = "Développeur web indépendant avec 4 ans d'expérience en JavaScript (React).";
const tags = "clément,douin,soywod,développement,développeur,application,web,javascript,typescript,react,indépendant";

export type HomePageProps = {
  lang: Lang;
};

export const HomePage: FC<HomePageProps> = ({lang}) => {
  const t = useTranslations(lang, "home");

  const now = DateTime.local();
  const yearsOld = Math.trunc(now.diff(DateTime.fromISO("1990-02-02", {locale: "fr"}), "years").years);
  const yearsJSExp = Math.trunc(now.diff(DateTime.fromISO("2015-01-01", {locale: "fr"}), "years").years);
  const yearsDevExp = Math.trunc(now.diff(DateTime.fromISO("2010-01-01", {locale: "fr"}), "years").years);

  return (
    <>
      <SEO title={title} desc={desc} tags={tags} />
      <h1>Hello, world!</h1>
      <hr />
      <p>{t("paragraph-1")}</p>
      <p>
        Je m&rsquo;appelle <code>Clément DOUIN</code>, j’ai {yearsOld} ans et je suis développeur web indépendant avec{" "}
        {yearsJSExp} ans d’expérience en JavaScript.
      </p>
      <p>
        Je développe des applications depuis plus de {yearsDevExp} ans. J’ai commencé par du C, du Java et du Visual
        Basic. Puis, je me suis tourné vers les technologies du web (PHP, JavaScript, NodeJS, jQuery), pour enfin me
        spécialiser dans le développement front-end avec React. Je découvre également la programmation fonctionnelle
        avec Haskell et Elm.
      </p>
      <p>
        Je travaille maintenant en tant qu’indépendant (micro-entrepreneur), et j’accompagne mes clients dans leur
        évolution numérique (développement de sites web et de modules personnalisés, mise à niveau, formations).
        N’hésitez-pas à <Link to="/contact">me contacter</Link> pour plus d’informations !
      </p>
    </>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = ctx => {
  const lang = ctx?.params?.lang as Lang;
  return {props: {lang}};
};

export default HomePage;
