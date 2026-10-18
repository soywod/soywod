import { Lang } from "../lib/lang";
import "./Footer.css";

export interface FooterProps {
  lang: Lang;
}

const COPY: Record<Lang, { archive: string }> = {
  en: { archive: "Archive" },
  fr: { archive: "Archives" },
};

export function Footer({ lang }: FooterProps) {
  const t = COPY[lang];

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span>© 2015–2026 Clément DOUIN</span>
        <nav className="footer__links" aria-label="Footer">
          <a href="https://pimalaya.org" target="_blank" rel="noopener noreferrer">
            Pimalaya
          </a>
          <a href={`/${lang}/archive/`}>{t.archive}</a>
          <a href="https://github.com/soywod" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
