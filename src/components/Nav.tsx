import { Lang } from "../lib/lang";
import { Button } from "./ui/Button";
import "./Nav.css";

export interface NavProps {
  lang: Lang;
  /* Current page's slug within the language, e.g. "" for home, "archive/". */
  path: string;
}

const COPY: Record<Lang, { services: string; work: string; how: string; archive: string; contact: string; other: string }> = {
  en: {
    services: "Services",
    work: "Work",
    how: "How I work",
    archive: "Archive",
    contact: "Contact",
    other: "Version française",
  },
  fr: {
    services: "Services",
    work: "Travaux",
    how: "Collaborer",
    archive: "Archives",
    contact: "Contact",
    other: "English version",
  },
};

export function Nav({ lang, path }: NavProps) {
  const t = COPY[lang];
  const home = `/${lang}/`;
  const other: Lang = lang === "en" ? "fr" : "en";

  return (
    <header className="nav">
      <div className="container nav__inner">
        <a href={home} className="nav__brand">
          <span className="nav__handle">soywod</span>
          <span className="nav__name">Clément DOUIN</span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          <a href={`${home}#services`}>{t.services}</a>
          <a href={`${home}#work`}>{t.work}</a>
          <a href={`${home}#how`}>{t.how}</a>
          <a href={`${home}archive/`} aria-current={path === "archive/" ? "page" : undefined}>
            {t.archive}
          </a>
        </nav>

        <div className="nav__actions">
          <a className="nav__lang" href={`/${other}/${path}`} hrefLang={other} aria-label={t.other}>
            {other.toUpperCase()}
          </a>
          <Button href={`${home}#contact`} size="sm">
            {t.contact}
          </Button>
        </div>
      </div>
    </header>
  );
}
