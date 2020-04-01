import React, {Fragment} from "react"
import {NextPage} from "next"
import {DateTime, Interval} from "luxon"

import Link from "../_shared/link"
import SEO from "../_shared/seo"

import classes from "./_page.scss"

const title = "Clément DOUIN | Expériences"
const desc = "Développeur web indépendant avec 4 ans d'expérience en JavaScript (React)."
const tags =
  "clément,douin,soywod,développement,développeur,application,web,javascript,typescript,react,indépendant"

type Experience = {
  title: string
  company: string
  desc: string
  tags: string[]
  begin: DateTime
  end: DateTime
  link: string | null
}

type ExperiencesPageProps = {
  experiences: Experience[]
}

const ExperiencesPage: NextPage<ExperiencesPageProps> = ({experiences}) => {
  return (
    <>
      <SEO title={title} desc={desc} tags={tags} />
      <h1>Expériences</h1>
      {experiences.map((props, key) => {
        const begin = DateTime.fromFormat(String(props.begin), "yyLL", {locale: "fr"})
        const end = props.end
          ? DateTime.fromFormat(String(props.end), "yyLL", {locale: "fr"})
          : null
        const interval = end
          ? Interval.fromDateTimes(begin, end).toFormat("LLL yy")
          : begin.toFormat("LLL yy") + " – maintenant"

        return (
          <Fragment key={key}>
            <hr />

            <h2 className={classes.title}>
              <span>{props.title}</span>
              <em>{interval}</em>
            </h2>

            {props.link && (
              <h3 className={classes.company}>
                @<Link to={props.link}>{props.company}</Link>
              </h3>
            )}

            <div className={classes.tags}>
              {props.tags.map(tag => (
                <span key={tag} className={classes.tag}>
                  {tag}
                </span>
              ))}
            </div>

            <p>{props.desc}</p>
          </Fragment>
        )
      })}
    </>
  )
}

ExperiencesPage.getInitialProps = () => {
  const webpackCtx = require.context("../experiences", true, /\.yml/)
  const keys = webpackCtx.keys()
  const experiences = keys
    .map(webpackCtx)
    .map((experience: Experience) => experience)
    .sort((a, b) => (b.begin as any) - (a.begin as any))

  return {experiences}
}

export default ExperiencesPage
