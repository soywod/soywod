import React, {Fragment} from 'react'
import Link from 'next/link'

import classes from './styles.scss'

const medias = [
  {name: 'LinkedIn', href: 'https://www.linkedin.com/in/soywod'},
  {name: 'GitHub', href: 'https://github.com/soywod'},
  {name: 'Stack Overflow', href: 'https://stackoverflow.com/users/6213048/soywod'},
  {name: 'Twitter', href: 'https://twitter.com/soywod'},
]

function Footer() {
  return (
    <>
      <hr />
      <footer className={classes.footer}>
        <div>
          <Link href="/job">
            <a className={classes.recruit}>
              <span>Recrutez-moi !</span>
              <span className={classes.available}>
                Actuellement disponible
                <svg className={classes.status} viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="50" />
                </svg>
              </span>
            </a>
          </Link>
        </div>
        <div className={classes.socials}>
          {medias.map(({name, href}, index) => (
            <Fragment key={name}>
              {index > 0 && <span className={classes.separator}>{' / '}</span>}
              <Link href={href}>
                <a className={classes.social} target="_blank" rel="noopener noreferrer">
                  {name}
                </a>
              </Link>
            </Fragment>
          ))}
        </div>
      </footer>
    </>
  )
}

export default Footer
