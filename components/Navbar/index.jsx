import React from 'react'

import Link from '../Link'
import avatar from '../../images/clement-douin.jpeg?size=80'

import classes from './styles.scss'

function Navbar() {
  return (
    <nav className={classes.nav}>
      <div>
        <Link className={classes.avatarLink} to="/">
          <img className={classes.avatar} src={avatar} alt="Clément DOUIN" />
          <span>Clément DOUIN</span>
        </Link>
      </div>

      <Link className={classes.link} to="/experiences">
        Expériences
      </Link>

      <Link className={classes.link} to="/projects">
        Projets
      </Link>

      <Link className={classes.link} to="/blog">
        Blog
      </Link>
    </nav>
  )
}

export default Navbar
