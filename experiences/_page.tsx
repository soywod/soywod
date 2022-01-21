import {Fragment} from "react";
import {GetStaticProps, NextPage} from "next";
import {DateTime, Interval} from "luxon";
import humanizeDuration from "humanize-duration";
import showdown from "showdown";

import Link from "../_shared/link";
import SEO from "../_shared/seo";
import {LangProps, parseLang, useI18n} from "../_shared/i18n";
import cs from "./_page.module.scss";

const title = "Clément DOUIN | Expériences";
const desc = "Développeur web indépendant avec 4 ans d'expérience en JavaScript (React).";
const tags = "clément,douin,soywod,développement,développeur,application,web,javascript,typescript,react,indépendant";

type SerializableExperience = {
  title: string;
  company: string;
  desc: string;
  tags: string[];
  begin: string;
  end: string | null;
  link: string | null;
};

type ExperiencesPageProps = LangProps & {
  experiences: SerializableExperience[];
};

const ExperiencesPage: NextPage<ExperiencesPageProps> = ({experiences, lang}) => {
  const {t} = useI18n(lang, "experience");

  return (
    <>
      <SEO title={title} desc={desc} tags={tags} />
      <h1>{t("title")}</h1>
      {experiences.map(experience => {
        let date = t("in-progress");
        const begin = DateTime.fromISO(experience.begin, {locale: lang});
        const end = experience.end ? DateTime.fromISO(experience.end, {locale: lang}) : DateTime.local();

        if (begin.month === end.month) {
          date = t("from-to", {from: begin.toFormat("d"), to: end.toFormat("d")});
          date += begin.toFormat(" LLL yyyy");
        } else if (begin.year === end.year) {
          date = t("from-to", {from: begin.toFormat("LLL"), to: end.toFormat("LLL")});
          date += begin.toFormat(" yyyy");
        } else {
          date = t("from-to", {from: begin.toFormat("LLL yyyy"), to: end.toFormat("LLL yyyy")});
        }

        const duration = humanizeDuration(Interval.fromDateTimes(begin, end).toDuration().valueOf(), {
          units: ["y", "mo", "w", "d"],
          language: lang,
          round: true,
          largest: 2,
        });

        return (
          <Fragment key={experience.company + experience.title}>
            <hr />
            <div className={cs.container}>
              <div className={cs.content}>
                <h2 className={cs.title}>{experience.title}</h2>
                <h3 className={cs.company}>
                  @{experience.link ? <Link to={experience.link}>{experience.company}</Link> : experience.company}
                </h3>
                <div className={cs.tags}>
                  {experience.tags.map(tag => (
                    <span key={tag} className={cs.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className={cs.times}>
                <time>{date}</time>
                <time>({duration})</time>
              </div>
            </div>
            <div dangerouslySetInnerHTML={{__html: experience.desc}} />
          </Fragment>
        );
      })}
    </>
  );
};

export const getStaticProps: GetStaticProps = ctx => {
  const lang = parseLang(ctx?.params?.lang);
  const webpackCtx = require.context("../experiences", true, /\.toml/);
  const keys = webpackCtx.keys();
  const experiences: SerializableExperience[] = keys
    .map(webpackCtx)
    .map((toml: any) => ({
      title: toml[lang].title,
      company: toml.company,
      desc: new showdown.Converter({openLinksInNewWindow: true}).makeHtml(toml[lang].desc),
      tags: toml.tags || [],
      begin: DateTime.fromISO(toml.begin),
      end: toml.end ? DateTime.fromISO(toml.end) : null,
      link: toml.link || null,
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
