import { Lang } from "../lib/lang";
import "./Footer.css";

export interface FooterProps {
  lang: Lang;
}

type Copy = {
  tagline: string;
  colWork: string;
  colOpenSource: string;
  colElsewhere: string;
  archive: string;
  contact: string;
};

const COPY: Record<Lang, Copy> = {
  en: {
    tagline: "Tailor-made software and AI installs for small businesses, built on open-source foundations.",
    colWork: "Work with me",
    colOpenSource: "Open source",
    colElsewhere: "Elsewhere",
    archive: "Past work (2015–2022)",
    contact: "Contact",
  },
  fr: {
    tagline: "Logiciels sur-mesure et installations IA pour petites entreprises, bâtis sur des fondations libres.",
    colWork: "Travailler ensemble",
    colOpenSource: "Logiciel libre",
    colElsewhere: "Ailleurs",
    archive: "Travaux passés (2015–2022)",
    contact: "Contact",
  },
};

export function Footer({ lang }: FooterProps) {
  const t = COPY[lang];

  return (
    <footer className="footer on-dark">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <span className="logo logo--on-dark">
              <span className="logo__mark">
                <img src="/avatar.jpeg" alt="Clément DOUIN" />
              </span>
              <span className="logo__word">Clément DOUIN</span>
            </span>
            <p className="footer__tagline">{t.tagline}</p>
          </div>

          <nav className="footer__cols" aria-label="Footer">
            <div className="footer__col">
              <h3 className="footer__col-title">{t.colWork}</h3>
              <ul>
                <li>
                  <a href={`/${lang}/archive/`}>{t.archive}</a>
                </li>
                <li>
                  <a href={`/${lang}/contact/`}>{t.contact}</a>
                </li>
              </ul>
            </div>
            <div className="footer__col">
              <h3 className="footer__col-title">{t.colOpenSource}</h3>
              <ul>
                <li>
                  <a href="https://github.com/soywod/himalaya" target="_blank" rel="noopener noreferrer">
                    Himalaya
                  </a>
                </li>
                <li>
                  <a href="https://pimalaya.org" target="_blank" rel="noopener noreferrer">
                    Pimalaya
                  </a>
                </li>
                <li>
                  <a href="https://github.com/pimalaya" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer__col">
              <h3 className="footer__col-title">{t.colElsewhere}</h3>
              <ul>
                <li>
                  <a href="https://www.linkedin.com/in/soywod" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="https://www.malt.fr/profile/soywod" target="_blank" rel="noopener noreferrer">
                    Malt
                  </a>
                </li>
                <li>
                  <a href="https://github.com/soywod" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="https://stackoverflow.com/users/6213048/soywod" target="_blank" rel="noopener noreferrer">
                    Stack Overflow
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="footer__bottom">
          <p>© 2015–2026 Clément DOUIN</p>
        </div>
      </div>
    </footer>
  );
}
