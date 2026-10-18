import type { ReactNode } from "react";
import { Lang } from "../lib/lang";
import { Button } from "../components/ui/Button";
import en from "./Home.en.json";
import fr from "./Home.fr.json";
import "./Home.css";

const COPY = { en, fr };

/*
 * Prerendered pages ship zero JavaScript (see prerender.js), so there is no
 * React state to gate a reveal-on-click. This inline, non-module script
 * survives the prerender's module-script strip and keeps the address out of
 * the raw HTML until a real click decodes it.
 */
const REVEAL_SCRIPT = `
document.querySelectorAll('a[data-reveal]').forEach(function (a) {
  a.addEventListener('click', function (evt) {
    var value = atob(a.dataset.reveal);
    if (a.dataset.revealed) return;
    evt.preventDefault();
    a.dataset.revealed = 'true';
    a.lastChild.textContent = value;
    a.href = 'mailto:' + value;
  });
});
`;

const ICONS: Record<string, ReactNode> = {
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 7l8.5 6 8.5-6" />
    </>
  ),
  code: (
    <>
      <path d="M8 6l-6 6 6 6" />
      <path d="M16 6l6 6-6 6" />
      <path d="M14 4l-4 16" />
    </>
  ),
  refresh: (
    <>
      <path d="M21 12a9 9 0 1 1-3-6.7" />
      <path d="M21 4v5h-5" />
    </>
  ),
};

function Icon({ name, size = 28 }: { name: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}

export function HomePage({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const emailB64 = btoa("clement.douin@posteo.net");

  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <div>
            <p className="label hero__eyebrow">{t.eyebrow}</p>
            <h1 className="hero__title">{t.title}</h1>
            <p className="hero__lead">{t.lead}</p>
            <div className="hero__cta">
              <Button href="#contact">{t.ctaPrimary}</Button>
              <Button href="#work" variant="secondary">
                {t.ctaSecondary}
              </Button>
            </div>
          </div>

          <div className="hero__aside">
            <figure className="portrait">
              <img src="/portrait.jpeg" alt={t.portraitAlt} width={120} height={120} />
              <figcaption>
                <span className="portrait__name">Clément DOUIN</span>
                <span className="portrait__meta">{t.portraitCaption}</span>
              </figcaption>
            </figure>
            <dl className="facts">
              {t.facts.map(fact => (
                <div key={fact.label} className="facts__item">
                  <dt>{fact.label}</dt>
                  <dd className={"small" in fact && fact.small ? "facts__value facts__value--small" : "facts__value"}>
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="section section--surface" id="services">
        <div className="container">
          <p className="label">{t.servicesLabel}</p>
          <h2 className="section__title">{t.servicesTitle}</h2>
          <div className="services">
            {t.services.map(service => (
              <article key={service.title} className="service">
                <Icon name={service.icon} />
                <h3>{service.title}</h3>
                <p className="muted">{service.text}</p>
              </article>
            ))}
          </div>
          <p className="muted services__note">{t.servicesNote}</p>
        </div>
      </section>

      <section className="section" id="work">
        <div className="container">
          <p className="label">{t.workLabel}</p>
          <h2 className="section__title">{t.workTitle}</h2>
          <p className="section__lead">{t.workLead}</p>
          <ul className="work">
            {t.work.map(item => (
              <li key={item.name} className="work__item">
                <div>
                  {"link" in item && item.link ? (
                    <a className="work__name" href={item.link} target="_blank" rel="noopener noreferrer">
                      {item.name}
                    </a>
                  ) : (
                    <span className="work__name">{item.name}</span>
                  )}
                  <p className="work__meta">{item.meta}</p>
                </div>
                <p className="muted">{item.text}</p>
              </li>
            ))}
          </ul>
          <p className="work__archive">
            <a href={`/${lang}/archive/`}>{t.archiveLink}</a>
          </p>
        </div>
      </section>

      <section className="section section--surface" id="how">
        <div className="container">
          <p className="label">{t.howLabel}</p>
          <h2 className="section__title">{t.howTitle}</h2>
          <div className="ways">
            <div className="way">
              <h3>{t.consultingTitle}</h3>
              <p className="muted">{t.consultingText}</p>
              <p className="way__price">{t.consultingPrice}</p>
            </div>
            <div className="way">
              <h3>{t.partnershipTitle}</h3>
              <p className="muted">{t.partnershipText}</p>
              <p className="way__foot">
                <Button href="https://pimalaya.org/business/" variant="secondary" external>
                  {t.partnershipCta}
                </Button>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section contact" id="contact">
        <div className="container contact__inner">
          <div>
            <h2 className="section__title">{t.contactTitle}</h2>
            <p className="section__lead">{t.contactLead}</p>
          </div>
          <div className="contact__actions">
            <a href="#contact" className="btn btn--primary" data-reveal={emailB64}>
              <Icon name="mail" size={18} />
              <span>{t.revealEmail}</span>
            </a>
            <Button href="https://github.com/soywod" variant="secondary" external>
              GitHub
            </Button>
            <Button href="https://www.linkedin.com/in/soywod" variant="secondary" external>
              LinkedIn
            </Button>
            <Button href="https://www.malt.fr/profile/soywod" variant="secondary" external>
              Malt
            </Button>
          </div>
        </div>
        <script dangerouslySetInnerHTML={{ __html: REVEAL_SCRIPT }} />
      </section>
    </>
  );
}
