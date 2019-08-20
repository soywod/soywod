import React from 'react'

import Experience from '../components/Experience'

function ExperiencesPage({experiences}) {
  return (
    <>
      <h1>Expériences</h1>

      {experiences.map((experience, key) => (
        <Experience key={key} {...experience} />
      ))}
    </>
  )
}

ExperiencesPage.getInitialProps = async () => {
  const webpackCtx = await require.context('../experiences', true, /\.yml/)
  const keys = webpackCtx.keys()
  const experiences = keys.map(webpackCtx).sort((a, b) => b.begin - a.begin)

  return {experiences}
}

export default ExperiencesPage
