import React from 'react'
import Head from 'next/head'

import classes from './styles.scss'

const desc = "Développeur web indépendant avec 4 ans d'expérience en JavaScript (React)."

function Home() {
  return (
    <>
      <Head>
        <title>Clément DOUIN</title>
        <meta name="description" content={desc} />
        <meta name="keywords" content="blog,soywod,tech,code,dev,react,typescript" />
        <meta property="og:title" content="Clément DOUIN" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${process.env.HOSTNAME}/`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@soywod" />
        <meta name="twitter:creator" content="@soywod" />
        <meta name="twitter:title" content="Clément DOUIN" />
        <meta name="twitter:description" content={desc} />
      </Head>

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
        personnalisés, mise à niveau, formations). N'hésitez-pas à me contacter pour plus
        d'informations !
      </p>
    </>
  )
}

export default Home
