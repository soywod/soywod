import {FC, Fragment} from "react";

import Link from "./link";
import {LangProps, useI18n} from "./i18n";
import cs from "./footer.module.scss";

const medias = [
  {name: "LinkedIn", href: "https://www.linkedin.com/in/soywod"},
  {name: "Malt", href: "https://www.malt.fr/profile/soywod"},
  {name: "GitHub", href: "https://github.com/soywod"},
  {name: "Stack Overflow", href: "https://stackoverflow.com/users/6213048/soywod"},
  {name: "Twitter", href: "https://twitter.com/soywod"},
];

type FooterProps = LangProps;

const Footer: FC<FooterProps> = ({lang}) => {
  const {t} = useI18n(lang, ["contact"]);

  return (
    <>
      <hr />
      <footer className={cs.footer}>
        <div>
          <Link to={`/${lang}/contact`} className={cs.recruit}>
            <span>{t("footer-link-label")}</span>
            <span className={cs.available}>
              {t("footer-availability")}
              <svg className={cs.status} viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="50" />
              </svg>
            </span>
          </Link>
        </div>
        <div className={cs.socials}>
          {medias.map(({name, href}, index) => (
            <Fragment key={name}>
              {index > 0 && <span className={cs.separator}>{" / "}</span>}
              <Link to={href} className={cs.social}>
                {name}
              </Link>
            </Fragment>
          ))}
        </div>
      </footer>
    </>
  );
};

export default Footer;
