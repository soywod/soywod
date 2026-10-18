import { renderToString } from "react-dom/server";

import App from "./App";
import { langs, Lang } from "./lib/lang";

import homeEn from "./pages/Home.en.json";
import homeFr from "./pages/Home.fr.json";
import archiveEn from "./pages/Archive.en.json";
import archiveFr from "./pages/Archive.fr.json";

const homeCopy = { en: homeEn, fr: homeFr };
const archiveCopy = { en: archiveEn, fr: archiveFr };

export interface Page {
  slug: string;
  lang: Lang;
  title: string;
  description: string;
  appHtml: string;
}

function page(lang: Lang, sub: string, title: string, description: string): Page {
  const slug = sub ? `${lang}/${sub}` : lang;
  return {
    slug,
    lang,
    title,
    description,
    appHtml: renderToString(<App url={`/${slug}/`} />),
  };
}

export function renderPages(): { pages: Page[] } {
  const pages: Page[] = [];

  for (const lang of langs) {
    pages.push(page(lang, "", homeCopy[lang].seoTitle, homeCopy[lang].seoDesc));
    pages.push(page(lang, "archive", archiveCopy[lang].seoTitle, archiveCopy[lang].seoDesc));
  }

  return { pages };
}
