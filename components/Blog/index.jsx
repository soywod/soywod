import React from 'react'
import Link from 'next/link'
import {DateTime} from 'luxon'
import Head from 'next/head'

import avatar from '../../images/clement-douin.jpeg?size=80'

import classes from './styles.scss'

const baseUrl = 'https://blog.soywod.me'
const desc = 'Personal blog about my reflections, experiences and experiments.'

function Blog(props) {
  return (
    <>
      <Head>
        <title>Blog | Clément DOUIN</title>
        <meta name="description" content={desc} />
        <meta name="keywords" content="blog,soywod,tech,code,dev,react,typescript" />
        <meta property="og:title" content="Clément DOUIN" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${baseUrl}/`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@soywod" />
        <meta name="twitter:creator" content="@soywod" />
        <meta name="twitter:title" content="Clément DOUIN" />
        <meta name="twitter:description" content={desc} />
      </Head>

      <h1>Blog</h1>

      <hr />

      {props.posts.map(post => (
        <div key={post.slug} className={classes.post}>
          <em className={classes.date}>{DateTime.fromISO(post.date).toFormat('LLL dd, yyyy')}</em>
          <span className={classes.separator}>{' > '}</span>
          <Link href={`/posts?slug=${post.slug}`} as={`/blog/${post.slug}`}>
            <a>{post.title}</a>
          </Link>
        </div>
      ))}
    </>
  )
}

export default Blog
