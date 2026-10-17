import { Lang } from "../lib/lang";
import { Button } from "../components/ui/Button";
import en from "./Home.en.json";
import fr from "./Home.fr.json";
import "./Home.css";

const COPY = { en, fr };

export function HomePage({ lang }: { lang: Lang }) {
  const t = COPY[lang];

  return (
    <section className="hero">
      <div className="container">
        <span className="eyebrow">{t.eyebrow}</span>
        <h1 className="hero__title">{t.title}</h1>
        <p className="hero__lead">{t.lead1}</p>
        <p className="hero__lead">{t.lead2}</p>
        <div className="hero__cta">
          <Button href={`/${lang}/contact/`}>{t.ctaPrimary}</Button>
          <Button href="https://pimalaya.org" variant="secondary" external>
            {t.ctaSecondary}
          </Button>
        </div>
      </div>
    </section>
  );
}
