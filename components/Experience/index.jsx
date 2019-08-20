import React from 'react'
import Link from 'next/link'
import {DateTime, Interval} from 'luxon'

import classes from './styles.scss'

function Experience(props) {
  const begin = DateTime.fromFormat(String(props.begin), 'yyLL', {locale: 'fr'})
  const end = props.end ? DateTime.fromFormat(String(props.end), 'yyLL', {locale: 'fr'}) : null
  const interval = end
    ? Interval.fromDateTimes(begin, end).toFormat('LLL yy')
    : begin.toFormat('LLL yy') + ' – maintenant'

  return (
    <>
      <hr />

      <h2 className={classes.title}>
        <span>{props.title}</span>
        <em>{interval}</em>
      </h2>

      {props.link && (
        <h3 className={classes.company}>
          @
          <Link href={props.link}>
            <a>{props.company}</a>
          </Link>
        </h3>
      )}

      <div className={classes.tags}>
        {props.tags.map(tag => (
          <span key={tag} className={classes.tag}>
            {tag}
          </span>
        ))}
      </div>

      <p>{props.desc}</p>
    </>
  )
}

export default Experience
