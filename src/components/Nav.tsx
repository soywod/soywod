import { Lang, langs } from "../lib/lang";
import "./Nav.css";

export interface NavProps {
  lang: Lang;
  /* Current page's slug within the language, e.g. "" for home, "archive/". */
  path: string;
}

const COPY: Record<Lang, { archive: string; contact: string }> = {
  en: { archive: "Archive", contact: "Contact" },
  fr: { archive: "Archives", contact: "Contact" },
};

export function Nav({ lang, path }: NavProps) {
  const t = COPY[lang];

  return (
    <header className="nav">
      <div className="container nav__inner">
        <a href={`/${lang}/`} className="logo">
          <span className="logo__mark">
            <img src="/avatar.jpeg" alt="Clément DOUIN" />
          </span>
          <span className="logo__word">Clément DOUIN</span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          <a href={`/${lang}/archive/`}>{t.archive}</a>
          <a href={`/${lang}/contact/`}>{t.contact}</a>
        </nav>

        <div className="nav__actions">
          {langs.map(l => (
            <a
              key={l}
              className="nav__lang"
              aria-current={l === lang ? "true" : undefined}
              href={`/${l}/${path}`}
            >
              {l.toUpperCase()}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
