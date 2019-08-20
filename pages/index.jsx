import React from 'react'
import Link from 'next/link'

import SEO from '../components/SEO'

const title = 'Clément DOUIN | Développeur web indépendant'
const desc = "Développeur web indépendant avec 4 ans d'expérience en JavaScript (React)."
const tags =
  'clément,douin,soywod,développement,développeur,application,web,javascript,typescript,react,indépendant'

function HomePage() {
  return (
    <>
      <SEO title={title} desc={desc} tags={tags} />
      <h1>Hello, world!</h1>
      <hr />
      <p>
        Je m'appelle <code>Clément DOUIN</code>, j'ai 29 ans et je suis développeur web indépendant
        avec 4 ans d'expérience en JavaScript.
      </p>
      <p>
        Je développe des applications depuis plus de 10 ans. J'ai commencé par du C, du Java et du
        Visual Basic. Puis, je me suis tourné vers les technologies du web (PHP, JavaScript, NodeJS,
        jQuery), pour enfin me spécialiser dans le développement front-end avec React.
      </p>
      <p>
        Je travaille maintenant en tant qu'indépendant (micro-entreprise), et j'accompagne mes
        clients dans leur évolution numérique (développement de sites web et de modules
        personnalisés, mise à niveau, formations). N'hésitez-pas à{' '}
        <Link href="/job">
          <a>me contacter</a>
        </Link>{' '}
        pour plus d'informations !
      </p>
    </>
  )
}

export default HomePage
