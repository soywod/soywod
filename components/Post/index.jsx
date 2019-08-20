import React from 'react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import {DateTime} from 'luxon'
import {DiscussionEmbed} from 'disqus-react'

import ArrowBack from '../ArrowBack'
import CodeBlock from '../CodeBlock'

import classes from './styles.scss'

function Post(props) {
  const {title, date, tags, content, slug} = props
  const disqusConfig = {identifier: slug, title}

  return (
    <>
      <h1 className={classes.title}>
        <Link prefetch href="/blog">
          <a className={classes.back}>
            <ArrowBack />
          </a>
        </Link>
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

      <hr />

      <ReactMarkdown source={content} renderers={{code: CodeBlock}} />
      <DiscussionEmbed shortname={process.env.DISQUS_SHORTNAME} config={disqusConfig} />
    </>
  )
}

export default Post
