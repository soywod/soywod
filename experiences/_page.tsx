import React from "react";
import {GetStaticProps, NextPage} from "next";
import {DateTime} from "luxon";
import showdown from "showdown";

import {Card} from "../_shared";
import SEO from "../_shared/seo";
import {LangProps, parseLang, useI18n} from "../_shared/i18n";
import Link from "../_shared/link";

const title = "Clément DOUIN | Expériences";
const desc = "Développeur web indépendant avec 4 ans d'expérience en JavaScript (React).";
const tags = "clément,douin,soywod,développement,développeur,application,web,javascript,typescript,react,indépendant";

type SerializableExperience = {
  title: string;
  company: string;
  companyLink: string | null;
  subcompany: string | null;
  subcompanyLink: string | null;
  image: string;
  desc: string;
  tags: string[];
  begin: string;
  end: string | null;
};

type ExperiencesPageProps = LangProps & {
  experiences: SerializableExperience[];
};

function renderCompany(company: string, link?: string | null): JSX.Element {
  return link ? <Link to={link}>{company}</Link> : <>{company}</>;
}

const ExperiencesPage: NextPage<ExperiencesPageProps> = ({experiences, lang}) => {
  const {t} = useI18n(lang, "experience");

  return (
    <>
      <SEO title={title} desc={desc} tags={tags} />
      <h1>{t("title")}</h1>
      {experiences.map((experience, key) => (
        <Card
          key={key}
          lang={lang}
          title={<>{experience.title}</>}
          subtitle={
            <>
              @{renderCompany(experience.company, experience.companyLink)}
              {experience.subcompany && <> (via {renderCompany(experience.subcompany, experience.subcompanyLink)})</>}
            </>
          }
          image={experience.image}
          tags={experience.tags}
          desc={experience.desc}
          begin={experience.begin}
          end={experience.end}
          link={experience.companyLink}
        />
      ))}
    </>
  );
};

export const getStaticProps: GetStaticProps = ctx => {
  const lang = parseLang(ctx?.params?.lang);
  const webpackCtx = require.context("../experiences", true, /\.toml$/);
  const keys = webpackCtx.keys();
  const names = keys.map(path => path.slice(2, -5));
  const experiences: SerializableExperience[] = keys
    .map(webpackCtx)
    .map((toml: any, idx) => ({
      title: toml[lang].title,
      company: toml.company,
      companyLink: toml.companyLink || null,
      subcompany: toml.subcompany || null,
      subcompanyLink: toml.subcompanyLink || null,
      image: require(`../experiences/${names[idx]}.jpeg`).default.src,
      desc: new showdown.Converter({openLinksInNewWindow: true}).makeHtml(toml[lang].desc),
      tags: toml.tags || [],
      begin: DateTime.fromISO(toml.begin),
      end: toml.end ? DateTime.fromISO(toml.end) : null,
    }))
    .sort((e1, e2) => {
      if (e1.begin < e2.begin) return 1;
      else if (e1.begin > e2.begin) return -1;
      else return 0;
    })
    .map(p => ({
      ...p,
      begin: p.begin.toISO(),
      end: p.end ? p.end.toISO() : null,
    }));

  return {props: {lang, experiences}};
};

export default ExperiencesPage;
