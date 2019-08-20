import React from 'react'

import Project from '../components/Project'

function ProjectsPage({projects}) {
  return (
    <>
      <h1>Projets</h1>

      {projects.map((project, key) => (
        <Project key={key} {...project} />
      ))}
    </>
  )
}

ProjectsPage.getInitialProps = async () => {
  const webpackCtx = await require.context('../projects', true, /\.yml/)
  const keys = webpackCtx.keys()
  const names = keys.map(path => path.slice(2, -4))
  const projects = keys
    .map(webpackCtx)
    .map((project, index) => ({
      ...project,
      image: require(`../projects/${names[index]}.jpeg`),
    }))
    .sort((a, b) => b.date - a.date)

  return {projects}
}

export default ProjectsPage
