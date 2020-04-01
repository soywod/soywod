import React, {Fragment} from "react"
import {DateTime, Interval} from "luxon"

import Link from "../_shared/link"
import SEO from "../_shared/seo"

import classes from "./_page.scss"

const title = "Clément DOUIN | Expériences"
const desc = "Développeur web indépendant avec 4 ans d'expérience en JavaScript (React)."
const tags =
  "clément,douin,soywod,développement,développeur,application,web,javascript,typescript,react,indépendant"

function ExperiencesPage({experiences}) {
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

ExperiencesPage.getInitialProps = async () => {
  const webpackCtx = await require.context("../experiences", true, /\.yml/)
  const keys = webpackCtx.keys()
  const experiences = keys.map(webpackCtx).sort((a, b) => b.begin - a.begin)

  return {experiences}
}

export default ExperiencesPage
