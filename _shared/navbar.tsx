import React, {FC} from "react"

import Link from "./link"
import avatar from "./avatar.jpeg?size=80"

import cs from "./navbar.scss"

const Navbar: FC = () => (
  <nav className={cs.nav}>
    <div>
      <Link className={cs.avatarLink} to="/">
        <img className={cs.avatar} src={avatar} alt="Clément DOUIN" />
        <span>Clément DOUIN</span>
      </Link>
    </div>

    <Link className={cs.link} to="/experiences">
      Expériences
    </Link>

    <Link className={cs.link} to="/projects">
      Projets
    </Link>

    <Link className={cs.link} to="/blog">
      Blog
    </Link>
  </nav>
)

export default Navbar
