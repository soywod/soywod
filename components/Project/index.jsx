import React from 'react'
import {DateTime} from 'luxon'

import Link from '../Link'

import classes from './styles.scss'

function Project(props) {
  const date = DateTime.fromFormat(String(props.date), 'yyLL', {locale: 'fr'}).toFormat('LLL yyyy')

  return (
    <>
      <hr />

      <div className={classes.container}>
        <div className={classes.imageContainer}>
          {props.link ? (
            <Link className={classes.imageLink} to={props.link}>
              <img className={classes.image} src={props.image} alt={props.title} />
            </Link>
          ) : (
            <img className={classes.image} src={props.image} alt={props.title} />
          )}
        </div>

        <div className={classes.content}>
          <h2 className={classes.title}>
            <span>{props.link ? <Link to={props.link}>{props.title}</Link> : props.title}</span>
            <em>{date}</em>
          </h2>

          <h3 className={classes.subtitle}>{props.subtitle}</h3>
          <div className={classes.tags}>
            {props.tags.map(tag => (
              <span key={tag} className={classes.tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p>{props.desc}</p>

      {props.source && <Link to={props.source}>> Sources</Link>}
    </>
  )
}

export default Project
