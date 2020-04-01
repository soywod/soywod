import React, {Fragment} from "react"
import {NextPage} from "next"
import {DateTime} from "luxon"
import isNull from "lodash/fp/isNull"

import Link from "../_shared/link"
import SEO from "../_shared/seo"

import cs from "./_page.scss"

const title = "Clément DOUIN | Projets"
const desc = "Développeur web indépendant avec 5 ans d'expérience en JavaScript (React)."
const tags =
  "clément,douin,soywod,développement,développeur,projets,web,javascript,typescript,react,startup"

type Project = {
  title: string
  subtitle: string
  desc: string
  image: string
  tags: string[]
  date: DateTime
  link: string | null
  source: string | null
}

type ProjectsPageProps = {
  projects: Project[]
}

const ProjectsPage: NextPage<ProjectsPageProps> = ({projects}) => {
  return (
    <>
      <SEO title={title} desc={desc} tags={tags} />
      <h1>Projets</h1>
      {projects.map((project, key) => {
        const date = project.date
          ? DateTime.fromFormat(String(project.date), "yyLL", {locale: "fr"}).toFormat("LLL yyyy")
          : "En cours"

        return (
          <Fragment key={key}>
            <hr />

            <div className={cs.container}>
              <div className={cs.imageContainer}>
                {project.link ? (
                  <Link className={cs.imageLink} to={project.link}>
                    <img className={cs.image} src={project.image} alt={project.title} />
                  </Link>
                ) : (
                  <img className={cs.image} src={project.image} alt={project.title} />
                )}
              </div>

              <div className={cs.content}>
                <h2 className={cs.title}>
                  <span>
                    {project.link ? <Link to={project.link}>{project.title}</Link> : project.title}
                  </span>
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

            {project.source && <Link to={project.source}>> Sources</Link>}
          </Fragment>
        )
      })}
    </>
  )
}

ProjectsPage.getInitialProps = () => {
  const webpackCtx = require.context("../projects", true, /\.yml/)
  const keys = webpackCtx.keys()
  const names = keys.map(path => path.slice(2, -4))
  const projects: Project[] = keys
    .map(webpackCtx)
    .map((project: Project, idx) => ({
      ...project,
      image: require(`../projects/${names[idx]}.jpeg`),
    }))
    .sort((a, b) => {
      if (isNull(a.date)) return -1
      if (isNull(b.date)) return 1
      return (b.date as any) - (a.date as any)
    })

  return {projects}
}

export default ProjectsPage
