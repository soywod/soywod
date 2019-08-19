import React from 'react'

import Pricing from '../components/Pricing'
import Contact from '../components/Contact'
import SEO from '../components/SEO'

const title = 'Clément DOUIN | Me recruter'
const desc =
  "Avec 4 ans d'expérience en JavaScript (React), je vous accompagne dans votre évolution numérique."
const tags =
  'clément,douin,soywod,développement,développeur,web,disponible,paris,freelance,indépendant,tarif'

function JobPage() {
  return (
    <>
      <SEO title={title} desc={desc} tags={tags} />
      <h1>Recrutez-moi !</h1>
      <Pricing />
      <Contact />
    </>
  )
}

export default JobPage
