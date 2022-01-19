import {Fragment} from "react";
import {GetStaticProps, NextPage} from "next";
import {DateTime, Interval} from "luxon";
import humanizeDuration from "humanize-duration";
import showdown from "showdown";

import Link from "../_shared/link";
import SEO from "../_shared/seo";
import Img from "../_shared/img";
import cs from "./_page.module.scss";
import {LangProps, parseLang, useI18n} from "../_shared/i18n";

const title = "Clément DOUIN | Projets";
const desc = "Développeur web indépendant avec 5 ans d'expérience en JavaScript (React).";
const tags = "clément,douin,soywod,développement,développeur,projets,web,javascript,typescript,react,startup";

type SerializableProject = {
  title: string;
  subtitle: string;
  desc: string;
  image: string;
  tags: string[];
  draft: boolean;
  begin: string;
  end: string | null;
  link: string | null;
  sources: string | null;
};

type ProjectsPageProps = LangProps & {
  projects: SerializableProject[];
};

const ProjectsPage: NextPage<ProjectsPageProps> = ({lang, projects}) => {
  const {t} = useI18n(lang, "project");

  return (
    <>
      <SEO title={title} desc={desc} tags={tags} />
      <h1>Projets</h1>
      {projects.map(project => {
        let date = t("in-progress");
        const begin = DateTime.fromISO(project.begin, {locale: lang});
        const end = project.end ? DateTime.fromISO(project.end, {locale: lang}) : DateTime.local();

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
          language: lang,
          largest: 2,
          maxDecimalPoints: 1,
        });

        return (
          <Fragment key={project.title}>
            <hr />
            <div className={cs.container}>
              {project.link ? (
                <Link className={cs.imageLink} to={project.link}>
                  <div className={cs.imageContainer}>
                    <Img src={project.image} alt={project.title} className={cs.image} />
                  </div>
                </Link>
              ) : (
                <div className={cs.imageContainer}>
                  <Img src={project.image} alt={project.title} className={cs.image} />
                </div>
              )}
              <div className={cs.content}>
                <h2 className={cs.title}>
                  {project.link ? <Link to={project.link}>{project.title}</Link> : project.title}
                </h2>
                <h3 className={cs.subtitle}>{project.subtitle}</h3>
                <div className={cs.tags}>
                  {project.tags.map(tag => (
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

            <div dangerouslySetInnerHTML={{__html: project.desc}} />

            {project.sources && (
              <div className={cs.linkContainer}>
                <Link className={cs.link} to={project.sources}>
                  <span>Code source</span>
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    width="0.75rem"
                  >
                    <path
                      fill="currentColor"
                      d="M384 320c-17.67 0-32 14.33-32 32v96H64V160h96c17.67 0 32-14.32 32-32s-14.33-32-32-32L64 96c-35.35 0-64 28.65-64 64V448c0 35.34 28.65 64 64 64h288c35.35 0 64-28.66 64-64v-96C416 334.3 401.7 320 384 320zM502.6 9.367C496.8 3.578 488.8 0 480 0h-160c-17.67 0-31.1 14.32-31.1 31.1c0 17.67 14.32 31.1 31.99 31.1h82.75L178.7 290.7c-12.5 12.5-12.5 32.76 0 45.26C191.2 348.5 211.5 348.5 224 336l224-226.8V192c0 17.67 14.33 31.1 31.1 31.1S512 209.7 512 192V31.1C512 23.16 508.4 15.16 502.6 9.367z"
                    />
                  </svg>
                </Link>
              </div>
            )}
          </Fragment>
        );
      })}
    </>
  );
};

export const getStaticProps: GetStaticProps = ctx => {
  const lang = parseLang(ctx?.params?.lang);
  const webpackCtx = require.context("../projects", true, /\.toml/);
  const keys = webpackCtx.keys();
  const names = keys.map(path => path.slice(2, -5));
  const projects: SerializableProject[] = keys
    .map(webpackCtx)
    .map((toml: any, idx) => ({
      title: toml.title,
      subtitle: toml[lang].subtitle,
      desc: new showdown.Converter({openLinksInNewWindow: true}).makeHtml(toml[lang].desc),
      image: require(`../projects/${names[idx]}.jpeg`).default.src,
      tags: toml.tags || [],
      draft: toml.draft || false,
      begin: DateTime.fromISO(toml.begin),
      end: toml.end ? DateTime.fromISO(toml.end) : null,
      link: toml.link || null,
      sources: toml.sources || null,
    }))
    .filter(p => !p.draft)
    .sort((p1, p2) => {
      if (p1.begin < p2.begin) return 1;
      else if (p1.begin > p2.begin) return -1;
      else return 0;
    })
    .map(p => ({
      ...p,
      begin: p.begin.toISO(),
      end: p.end ? p.end.toISO() : null,
    }));

  return {props: {lang, projects}};
};

export default ProjectsPage;
