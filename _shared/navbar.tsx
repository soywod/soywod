import React, {FC} from "react";

import Link from "./link";
import Img from "./img";
import avatar from "./avatar.jpeg";
import cs from "./navbar.module.scss";

const Navbar: FC = () => (
  <nav className={cs.nav}>
    <div>
      <Link className={cs.avatarLink} to="/">
        <Img className={cs.avatar} src={avatar} alt="Clément DOUIN" width={48} height={48} />
        <span>Clément DOUIN</span>
      </Link>
    </div>

    <Link className={cs.link} to="/experiences">
      Expériences
    </Link>

    <Link className={cs.link} to="/projects">
      Projets
    </Link>
  </nav>
);

export default Navbar;
