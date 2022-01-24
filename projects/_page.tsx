import {GetStaticProps, NextPage} from "next";
import Link from "next/link";
import {DateTime} from "luxon";
import showdown from "showdown";

import {Card} from "../_shared";
import SEO from "../_shared/seo";
import {LangProps, parseLang, useI18n} from "../_shared/i18n";
import React from "react";

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
      <h1>{t("title")}</h1>
      {projects.map((project, key) => (
        <Card
          key={key}
          lang={lang}
          title={project.link ? <Link href={project.link}>{project.title}</Link> : <>{project.title}</>}
          subtitle={<>{project.subtitle}</>}
          image={project.image}
          tags={project.tags}
          desc={project.desc}
          begin={project.begin}
          end={project.end}
          link={project.link}
          sourcesLink={project.sources}
        />
      ))}
    </>
  );
};

export const getStaticProps: GetStaticProps = ctx => {
  const lang = parseLang(ctx?.params?.lang);
  const webpackCtx = require.context("../projects", true, /\.toml$/);
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
