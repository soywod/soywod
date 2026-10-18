import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const dist = resolve(root, "dist");
const siteUrl = "https://soywod.me";

const { renderPages, renderLlmsTxt } = await import(pathToFileURL(resolve(dist, "server/entry-server.js")).href);
const { pages } = renderPages();

const locales = { en: "en_US", fr: "fr_FR", ru: "ru_RU" };

let css = "";
const template = readFileSync(resolve(dist, "index.html"), "utf-8").replace(
  /<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/,
  (_, href) => {
    css = readFileSync(resolve(dist, "." + href), "utf-8");
    return `<style>${css}</style>`;
  },
);

function fontPreloads(subset) {
  const pattern = new RegExp(`url\\((/assets/ibm-plex-sans-${subset}-(?:400-normal|600-normal)-[^)]+\\.woff2)\\)`, "g");
  return [...css.matchAll(pattern)].map(
    m => `<link rel="preload" href="${m[1]}" as="font" type="font/woff2" crossorigin />`,
  );
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function sansLang(page) {
  return page.slug.split("/").slice(1).join("/");
}

function twinsOf(page) {
  return pages.filter(p => sansLang(p) === sansLang(page));
}

function alternateLinks(page) {
  const twins = twinsOf(page);
  const links = twins.map(p => `<link rel="alternate" hreflang="${p.lang}" href="${siteUrl}/${p.slug}/" />`);
  const fallback = twins.find(p => p.lang === "en");
  if (fallback) links.push(`<link rel="alternate" hreflang="x-default" href="${siteUrl}/${fallback.slug}/" />`);
  return links;
}

for (const p of pages) {
  const canonical = `${siteUrl}/${p.slug}/`;
  const jsonLd = JSON.stringify(p.jsonLd).replace(/</g, "\\u003c");
  const head = [
    ...fontPreloads("latin"),
    ...(p.lang === "ru" ? fontPreloads("cyrillic") : []),
    ...alternateLinks(p),
    `<meta property="og:locale" content="${locales[p.lang]}" />`,
    ...twinsOf(p)
      .filter(q => q.lang !== p.lang)
      .map(q => `<meta property="og:locale:alternate" content="${locales[q.lang]}" />`),
    `<script type="application/ld+json">${jsonLd}</script>`,
  ].join("\n    ");

  const html = template
    .replace("<!--app-head-->", () => head)
    .replace("<!--app-html-->", () => p.appHtml)
    .replace(/\s*<script type="module"[^>]*><\/script>/g, "")
    .replace(/\s*<link rel="modulepreload"[^>]*>/g, "")
    .replace(/<html lang="[^"]*">/, `<html lang="${p.lang}">`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(p.title)}</title>`)
    .replace(
      /<meta\s+name="description"[\s\S]*?\/>/,
      `<meta name="description" content="${escapeHtml(p.description)}" />`,
    )
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(
      /<meta property="og:title"[\s\S]*?\/>/,
      `<meta property="og:title" content="${escapeHtml(p.title)}" />`,
    )
    .replace(
      /<meta\s+property="og:description"[\s\S]*?\/>/,
      `<meta property="og:description" content="${escapeHtml(p.description)}" />`,
    )
    .replace(
      /<meta property="og:url" content="[^"]*" \/>/,
      `<meta property="og:url" content="${canonical}" />`,
    );

  const dir = resolve(dist, p.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(resolve(dir, "index.html"), html);
  console.log(`✓ pre-rendered dist/${p.slug}/index.html`);
}

writeFileSync(
  resolve(dist, "index.html"),
  `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="refresh" content="0; url=/en/" />
    <link rel="canonical" href="${siteUrl}/en/" />
    <title>Clément DOUIN</title>
  </head>
  <body>
    <p><a href="/en/">Continue to the English site</a>, <a href="/fr/">continuer en français</a>, <a href="/ru/">перейти на русскую версию</a></p>
  </body>
</html>
`,
);

const urls = pages
  .map(p => {
    const twins = pages
      .filter(q => sansLang(q) === sansLang(p))
      .map(q => `\n    <xhtml:link rel="alternate" hreflang="${q.lang}" href="${siteUrl}/${q.slug}/" />`)
      .join("");
    return `  <url>\n    <loc>${siteUrl}/${p.slug}/</loc>${twins}\n  </url>`;
  })
  .join("\n");
writeFileSync(
  resolve(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`,
);
writeFileSync(
  resolve(dist, "robots.txt"),
  `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`,
);
writeFileSync(resolve(dist, "llms.txt"), renderLlmsTxt());
console.log("✓ generated dist/sitemap.xml, dist/robots.txt and dist/llms.txt");

rmSync(resolve(dist, "server"), { recursive: true, force: true });
