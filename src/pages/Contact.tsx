import { Lang } from "../lib/lang";
import en from "./Contact.en.json";
import fr from "./Contact.fr.json";

const COPY = { en, fr };

/*
 * Prerendered pages ship zero JavaScript (see prerender.js), so there is no
 * React state to gate a reveal-on-click. This inline, non-module script
 * survives the prerender's module-script strip and keeps the address out of
 * the raw HTML until a real click decodes it — the same deterrent the old
 * client-rendered version had, without needing a shipped React bundle.
 */
const REVEAL_SCRIPT = `
document.querySelectorAll('a[data-reveal]').forEach(function (a) {
  a.addEventListener('click', function (evt) {
    evt.preventDefault();
    var value = atob(a.dataset.reveal);
    a.textContent = value;
    a.href = a.dataset.kind + ':' + value.replace(/\\s+/g, '');
  });
});
`;

export function ContactPage({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const emailB64 = btoa("clement.douin@posteo.net");
  const phoneB64 = btoa("+33 6 30 34 35 47");

  return (
    <div className="prose">
      <h1>{t.title}</h1>
      <p>
        {t.p1} (<a href="#" data-reveal={emailB64} data-kind="mailto">{t.reveal}</a>)
        {t.p2} (<a href="#" data-reveal={phoneB64} data-kind="tel">{t.reveal}</a>) {t.p3}
      </p>
      <script dangerouslySetInnerHTML={{ __html: REVEAL_SCRIPT }} />
    </div>
  );
}
