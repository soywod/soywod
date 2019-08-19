import React from 'react'
import Link from 'next/link'

import logo from './logo.png'

import classes from './styles.scss'

function Navbar() {
  return (
    <nav className={classes.nav}>
      <div className={classes.brand}>
        <Link href="/">
          <a className={classes.brandDesktop}>Clément DOUIN</a>
        </Link>

        <Link href="/">
          <a className={classes.brandMobile}>
            <img width={32} src={logo} alt="Clément DOUIN" />
          </a>
        </Link>
      </div>

      <Link href="/">
        <a className={classes.item}>À propos</a>
      </Link>

      <Link href="/cv">
        <a className={classes.item}>CV</a>
      </Link>

      <Link href="/blog">
        <a className={classes.item}>Blog</a>
      </Link>
    </nav>
  )
}

export default Navbar
