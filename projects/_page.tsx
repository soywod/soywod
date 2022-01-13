import {Fragment} from "react";
import {NextPage} from "next";
import {DateTime} from "luxon";

import Link from "../_shared/link";
import SEO from "../_shared/seo";
import Img from "../_shared/img";
import cs from "./_page.module.scss";

const title = "Clément DOUIN | Projets";
const desc = "Développeur web indépendant avec 5 ans d'expérience en JavaScript (React).";
const tags = "clément,douin,soywod,développement,développeur,projets,web,javascript,typescript,react,startup";

type Project = {
  title: string;
  subtitle: string;
  desc: string;
  image: string;
  tags: string[];
  date: DateTime;
  link: string | null;
  source: string | null;
};

type ProjectsPageProps = {
  projects: Project[];
};

const ProjectsPage: NextPage<ProjectsPageProps> = ({projects}) => {
  return (
    <>
      <SEO title={title} desc={desc} tags={tags} />
      <h1>Projets</h1>
      {projects.map((project, key) => {
        const date = project.date
          ? DateTime.fromFormat(String(project.date), "yyLL", {locale: "fr"}).toFormat("LLL yyyy")
          : "En cours";

        return (
          <Fragment key={key}>
            <hr />

            <div className={cs.container}>
              <div className={cs.imageContainer}>
                {project.link ? (
                  <Link className={cs.imageLink} to={project.link}>
                    <div className={cs.image}>
                      <Img src={project.image} alt={project.title} className={cs.image} />
                    </div>
                  </Link>
                ) : (
                  <div className={cs.image}>
                    <Img src={project.image} alt={project.title} />
                  </div>
                )}
              </div>

              <div className={cs.content}>
                <h2 className={cs.title}>
                  <span>{project.link ? <Link to={project.link}>{project.title}</Link> : project.title}</span>
                  <em>{date}</em>
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
            </div>

            <p>{project.desc}</p>

            {project.source && (
              <div className={cs.linkContainer}>
                <Link className={cs.link} to={project.source}>
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

ProjectsPage.getInitialProps = () => {
  const webpackCtx = require.context("../projects", true, /\.yml/);
  const keys = webpackCtx.keys();
  const names = keys.map(path => path.slice(2, -4));
  const projects: Project[] = keys
    .map(webpackCtx)
    .map((project: Project, idx) => ({
      ...project,
      image: require(`../projects/${names[idx]}.jpeg`),
    }))
    .sort((a, b) => {
      if (a.date === null) return -1;
      if (b.date === null) return 1;
      return (b.date as any) - (a.date as any);
    });

  return {projects};
};

export default ProjectsPage;
