import React from 'react'
import {DateTime} from 'luxon'

import Link from '../Link'

import classes from './styles.scss'

function PostPreview(props) {
  return (
    <div className={classes.post}>
      <em className={classes.date}>
        {DateTime.fromISO(props.date, {locale: 'fr'}).toFormat('dd LLL yyyy')}
      </em>
      <span className={classes.separator}>{' > '}</span>
      <Link to={`/posts?slug=${props.slug}`} as={`/blog/${props.slug}`}>
        {props.title}
      </Link>
    </div>
  )
}

export default PostPreview
