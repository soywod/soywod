import React, {Fragment} from 'react'

import Link from '../Link'

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
          <Link to="/job" className={classes.recruit}>
            <span>Recrutez-moi !</span>
            <span className={classes.available}>
              Actuellement disponible
              <svg className={classes.status} viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="50" />
              </svg>
            </span>
          </Link>
        </div>
        <div className={classes.socials}>
          {medias.map(({name, href}, index) => (
            <Fragment key={name}>
              {index > 0 && <span className={classes.separator}>{' / '}</span>}
              <Link to={href} className={classes.social}>
                {name}
              </Link>
            </Fragment>
          ))}
        </div>
      </footer>
    </>
  )
}

export default Footer
