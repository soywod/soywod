import React from 'react'
import Head from 'next/head'

function SEO({title, desc, tags, url}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta name="keywords" content={tags} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={process.env.HOSTNAME + url} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@soywod" />
      <meta name="twitter:creator" content="@soywod" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
    </Head>
  )
}

export default SEO
