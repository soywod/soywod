import React, {FC} from "react";
import {useRouter} from "next/router";

import Link from "./link";
import Img from "./img";
import avatar from "./avatar.jpeg";
import {langs, LangProps, useI18n} from "./i18n";
import cs from "./navbar.module.scss";

export type NavbarProps = LangProps;

const Navbar: FC<NavbarProps> = props => {
  const {t} = useI18n(props.lang, ["experience", "project"]);
  const router = useRouter();

  function changeLang(evt: React.ChangeEvent<HTMLSelectElement>) {
    const subpath = router.asPath ? router.asPath.slice(3) : "";
    router.push(`/${evt.target.value}/${subpath}`);
  }

  return (
    <nav className={cs.nav}>
      <div>
        <Link className={cs.avatarLink} to={`/${props.lang}`}>
          <span className={cs.avatar}>
            <Img src={avatar} alt="Clément DOUIN" />
          </span>
          <span className={cs.avatarTitle}>Clément DOUIN</span>
        </Link>
      </div>
      <select className={cs.lang} onChange={changeLang} value={props.lang}>
        {langs.map(lang => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>
      <Link className={cs.link} to={`/${props.lang}/experiences`}>
        {t("navbar", {ns: "experience"})}
      </Link>
      <Link className={cs.link} to={`/${props.lang}/projects`}>
        {t("navbar", {ns: "project"})}
      </Link>
    </nav>
  );
};

export default Navbar;
