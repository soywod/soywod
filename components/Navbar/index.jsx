import React from 'react'
import Link from 'next/link'

import avatar from '../../images/clement-douin.jpeg?size=80'

import classes from './styles.scss'

function Navbar() {
  return (
    <nav className={classes.nav}>
      <div>
        <Link href="/">
          <a className={classes.avatarLink}>
            <img className={classes.avatar} src={avatar} alt="Clément DOUIN" />
            <span>Clément DOUIN</span>
          </a>
        </Link>
      </div>

      <Link href="/experiences">
        <a className={classes.item}>Expériences</a>
      </Link>

      <Link href="/projects">
        <a className={classes.item}>Projets</a>
      </Link>

      <Link href="/blog">
        <a className={classes.item}>Blog</a>
      </Link>
    </nav>
  )
}

export default Navbar
