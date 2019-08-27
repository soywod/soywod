import React from 'react'
import ReactMarkdown from 'react-markdown'
import {DateTime} from 'luxon'
import {DiscussionEmbed} from 'disqus-react'

import Link from '../Link'
import CodeBlock from './CodeBlock'
import IconArrowBack from './IconArrowBack'

import classes from './styles.scss'

function Post(props) {
  const {title, date, tags, content, slug} = props
  const disqusConfig = {url: process.env.HOSTNAME + '/blog/' + slug, identifier: slug, title}

  return (
    <>
      <h1 className={classes.title}>
        <Link className={classes.back} prefetch to="/blog">
          <IconArrowBack />
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
