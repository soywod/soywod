import React, {FC} from "react";

import Link from "./link";
import Img from "./img";
import avatar from "./avatar.jpeg";
import {LangProps, useI18n} from "./i18n";
import cs from "./navbar.module.scss";

export type NavbarProps = LangProps;

const Navbar: FC<NavbarProps> = ({lang}) => {
  const {t} = useI18n(lang, ["experience", "project"]);

  return (
    <nav className={cs.nav}>
      <div>
        <Link className={cs.avatarLink} to={`/${lang}`}>
          <span className={cs.avatar}>
            <Img src={avatar} alt="Clément DOUIN" />
          </span>
          <span>Clément DOUIN</span>
        </Link>
      </div>

      <Link className={cs.link} to={`/${lang}/experiences`}>
        {t("navbar", {ns: "experience"})}
      </Link>

      <Link className={cs.link} to={`/${lang}/projects`}>
        {t("navbar", {ns: "project"})}
      </Link>
    </nav>
  );
};

export default Navbar;
