import { Lang, langs, languageNames } from "../lib/lang";
import { Button } from "./ui/Button";
import "./Nav.css";

export interface NavProps {
  lang: Lang;
  path: string;
}

const COPY: Record<Lang, { services: string; work: string; how: string; archive: string; contact: string }> = {
  en: {
    services: "Services",
    work: "Open source",
    how: "How I work",
    archive: "Archive",
    contact: "Contact",
  },
  fr: {
    services: "Services",
    work: "Logiciel libre",
    how: "Collaborer",
    archive: "Archives",
    contact: "Contact",
  },
  ru: {
    services: "Услуги",
    work: "Открытый код",
    how: "Сотрудничество",
    archive: "Архив",
    contact: "Связаться",
  },
};

export function Nav({ lang, path }: NavProps) {
  const t = COPY[lang];
  const home = `/${lang}/`;

  return (
    <header className="nav">
      <div className="container nav__inner">
        <a href={home} className="nav__brand">
          <span className="nav__name">Clément DOUIN</span>
          <span className="nav__handle">soywod</span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          <a href={`${home}#services`}>{t.services}</a>
          <a href={`${home}#open-source`}>{t.work}</a>
          <a href={`${home}#how`}>{t.how}</a>
          <a href={`${home}archive/`} aria-current={path === "archive/" ? "page" : undefined}>
            {t.archive}
          </a>
        </nav>

        <div className="nav__actions">
          {langs
            .filter(other => other !== lang)
            .map(other => (
              <a
                key={other}
                className="nav__lang"
                href={`/${other}/${path}`}
                hrefLang={other}
                aria-label={`${other.toUpperCase()}, ${languageNames[lang][other]}`}
              >
                {other.toUpperCase()}
              </a>
            ))}
          <a
            className="nav__icon"
            href="https://github.com/soywod"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.1.63-1.35-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.59.69.48A10 10 0 0 0 12 2z" />
            </svg>
          </a>
          <Button href={`${home}#contact`} size="sm">
            {t.contact}
          </Button>
        </div>
      </div>
    </header>
  );
}
