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
        {medias.map(({name, href}, index) => (
          <Fragment key={name}>
            {index > 0 && <span className={classes.separator}>{' / '}</span>}
            <Link href={href}>
              <a target="_blank" rel="noopener noreferrer">
                {name}
              </a>
            </Link>
          </Fragment>
        ))}
      </footer>
    </>
  )
}

export default Footer
