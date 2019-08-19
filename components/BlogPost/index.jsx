import React, {Fragment} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import {DateTime} from 'luxon'
import {DiscussionEmbed} from 'disqus-react'

import ArrowBack from '../ArrowBack'
import CodeBlock from '../CodeBlock'

import classes from './styles.scss'

const baseUrl = 'https://blog.soywod.me'

function BlogPost(props) {
  const {title, desc, date, tags, content, slug} = props.post
  const disqusShortname = 'clement-douin'
  const disqusConfig = {identifier: slug, title}

  return (
    <Fragment>
      <Head>
        <title>{title} | Clément DOUIN</title>
        <meta name="description" content={desc} />
        <meta name="keywords" content={tags.concat(['blog', 'soywod']).join(',')} />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${baseUrl}/posts/${slug}/`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@soywod" />
        <meta name="twitter:creator" content="@soywod" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
      </Head>

      <Link prefetch href="/">
        <a className={classes.back}>
          <ArrowBack />
          Back
        </a>
      </Link>

      <h1 className={classes.title}>
        <span>{title}</span>
        <em>{DateTime.fromISO(date).toRelative()}</em>
      </h1>

      <div className={classes.tags}>
        {tags.map(tag => (
          <span key={tag} className={classes.tag}>
            {tag}
          </span>
        ))}
      </div>

      <ReactMarkdown source={content} renderers={{code: CodeBlock}} />
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </Fragment>
  )
}

export default BlogPost
