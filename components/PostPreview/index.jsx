import React from 'react'
import Link from 'next/link'
import {DateTime} from 'luxon'

import classes from './styles.scss'

function PostPreview(props) {
  return (
    <div className={classes.post}>
      <em className={classes.date}>
        {DateTime.fromISO(props.date, {locale: 'fr'}).toFormat('dd LLL yyyy')}
      </em>
      <span className={classes.separator}>{' > '}</span>
      <Link href={`/posts?slug=${props.slug}`} as={`/blog/${props.slug}`}>
        <a>{props.title}</a>
      </Link>
    </div>
  )
}

export default PostPreview
