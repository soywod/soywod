import { renderToString } from "react-dom/server";

import App from "./App";
import { langs, Lang } from "./lib/lang";
import { loadExperiences, loadProjects } from "./pages/Archive";

import homeEn from "./pages/Home.en.json";
import homeFr from "./pages/Home.fr.json";
import homeRu from "./pages/Home.ru.json";
import archiveEn from "./pages/Archive.en.json";
import archiveFr from "./pages/Archive.fr.json";
import archiveRu from "./pages/Archive.ru.json";

const homeCopy = { en: homeEn, fr: homeFr, ru: homeRu };
const archiveCopy = { en: archiveEn, fr: archiveFr, ru: archiveRu };

const SITE = "https://soywod.me";
const PERSON_ID = `${SITE}/#person`;
const JOB_TITLES: Record<Lang, string> = {
  en: "Independent software engineer",
  fr: "Ingénieur logiciel indépendant",
  ru: "Независимый инженер-программист",
};

const SAME_AS = [
  "https://github.com/soywod",
  "https://www.linkedin.com/in/soywod",
  "https://www.malt.fr/profile/soywod",
  "https://stackoverflow.com/users/6213048/soywod",
];

export interface Page {
  slug: string;
  lang: Lang;
  title: string;
  description: string;
  appHtml: string;
  jsonLd: object;
}

function person(lang: Lang) {
  const t = homeCopy[lang];
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Clément DOUIN",
    alternateName: "soywod",
    url: `${SITE}/${lang}/`,
    image: `${SITE}/portrait.jpeg`,
    jobTitle: JOB_TITLES[lang],
    description: t.seoDesc,
    knowsLanguage: ["fr", "en"],
    knowsAbout: [
      "Rust",
      "Backend development",
      "Software architecture",
      "APIs",
      "Email",
      "Contacts",
      "Calendars",
      "IMAP",
      "SMTP",
      "JMAP",
      "CalDAV",
      "CardDAV",
      "OAuth",
      "Retrieval-augmented generation",
      "Model Context Protocol",
    ],
    sameAs: SAME_AS,
  };
}

function homeJsonLd(lang: Lang, url: string) {
  const t = homeCopy[lang];
  return {
    "@context": "https://schema.org",
    "@graph": [
      person(lang),
      {
        "@type": "ProfessionalService",
        "@id": `${SITE}/#service`,
        name: "Clément DOUIN",
        url,
        image: `${SITE}/portrait.jpeg`,
        description: t.seoDesc,
        provider: { "@id": PERSON_ID },
        areaServed: ["France", "Switzerland"],
        availableLanguage: ["fr", "en"],
        priceRange: t.consultingPrice,
        makesOffer: {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: t.consultingTitle, description: t.consultingText.replace(/\*/g, "") },
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: 800,
            priceCurrency: "EUR",
            unitText: "DAY",
            valueAddedTaxIncluded: false,
          },
        },
      },
      {
        "@type": "WebPage",
        "@id": url,
        url,
        name: t.seoTitle,
        description: t.seoDesc,
        inLanguage: lang,
        about: { "@id": PERSON_ID },
      },
    ],
  };
}

function archiveJsonLd(lang: Lang, url: string) {
  const t = archiveCopy[lang];
  return {
    "@context": "https://schema.org",
    "@graph": [
      person(lang),
      {
        "@type": "WebPage",
        "@id": url,
        url,
        name: t.seoTitle,
        description: t.seoDesc,
        inLanguage: lang,
        about: { "@id": PERSON_ID },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Clément DOUIN", item: `${SITE}/${lang}/` },
            { "@type": "ListItem", position: 2, name: t.label, item: url },
          ],
        },
      },
    ],
  };
}

function page(lang: Lang, sub: string): Page {
  const slug = sub ? `${lang}/${sub}` : lang;
  const url = `${SITE}/${slug}/`;
  const copy = sub === "archive" ? archiveCopy[lang] : homeCopy[lang];
  return {
    slug,
    lang,
    title: copy.seoTitle,
    description: copy.seoDesc,
    appHtml: renderToString(<App url={`/${slug}/`} />),
    jsonLd: sub === "archive" ? archiveJsonLd(lang, url) : homeJsonLd(lang, url),
  };
}

export function renderPages(): { pages: Page[] } {
  const pages: Page[] = [];
  for (const lang of langs) {
    pages.push(page(lang, ""));
    pages.push(page(lang, "archive"));
  }
  return { pages };
}

function plain(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, "$1");
}

export function renderLlmsTxt(): string {
  const t = homeCopy.en;
  const services = t.services.map(s => `- **${s.title}**: ${plain(s.text)}`).join("\n");
  const work = t.work
    .map(w => ("link" in w && w.link ? `- [${w.name}](${w.link})` : `- ${w.name}`) + ` (${w.meta}): ${plain(w.text)}`)
    .join("\n");
  const experiences = loadExperiences("en")
    .map(r => `- ${r.when}: ${r.name}, ${r.detail} (${r.tags.join(", ")})`)
    .join("\n");
  const projects = loadProjects("en")
    .map(r => `- ${r.when}: ${r.name}, ${r.detail} (${r.tags.join(", ")})`)
    .join("\n");

  return `# Clément DOUIN (soywod)

> ${t.seoDesc}

${plain(t.lead)}

## Services

${services}

${plain(t.servicesAi)}

## Open source: Pimalaya

${plain(t.workLead)}

${work}

## Working together

- **${t.consultingTitle}**: ${plain(t.consultingText)} ${t.consultingPrice}, ${t.consultingPriceNote}.
- **${t.partnershipTitle}**: ${plain(t.partnershipText)} See https://pimalaya.org/business/.

Contact: ${SITE}/en/#contact, or ${SAME_AS.slice(0, 3).join(", ")}.

## Pages

- [Home](${SITE}/en/): profile, services, open source, how to work together, contact
- [Archive](${SITE}/en/archive/): experience and freelance projects, 2010 to 2022
- [Accueil](${SITE}/fr/): the same profile in French
- [Archives](${SITE}/fr/archive/): the archive in French
- [Главная](${SITE}/ru/): the same profile in Russian
- [Архив](${SITE}/ru/archive/): the archive in Russian

## Experience, 2010 to 2022

${experiences}

## Freelance projects, 2016 to 2022

${projects}
`;
}
