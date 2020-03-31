import React from "react"

import Experience from "../components/Experience"
import SEO from "../components/SEO"

const title = "Clément DOUIN | Expériences"
const desc = "Développeur web indépendant avec 4 ans d'expérience en JavaScript (React)."
const tags =
  "clément,douin,soywod,développement,développeur,application,web,javascript,typescript,react,indépendant"

function ExperiencesPage({experiences}) {
  return (
    <>
      <SEO title={title} desc={desc} tags={tags} />
      <h1>Expériences</h1>
      {experiences.map((experience, key) => (
        <Experience key={key} {...experience} />
      ))}
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
