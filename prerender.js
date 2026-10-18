import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const dist = resolve(root, "dist");
const siteUrl = "https://soywod.me";

const { renderPages } = await import(pathToFileURL(resolve(dist, "server/entry-server.js")).href);
const { pages } = renderPages();

const template = readFileSync(resolve(dist, "index.html"), "utf-8");

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

function alternateLinks(page) {
  const sibling = pages.find(p => p.lang !== page.lang && sansLang(p) === sansLang(page));
  const links = [`<link rel="alternate" hreflang="${page.lang}" href="${siteUrl}/${page.slug}/" />`];
  if (sibling) {
    links.push(`<link rel="alternate" hreflang="${sibling.lang}" href="${siteUrl}/${sibling.slug}/" />`);
    const fallback = page.lang === "en" ? page : sibling;
    links.push(`<link rel="alternate" hreflang="x-default" href="${siteUrl}/${fallback.slug}/" />`);
  }
  return links.join("\n    ");
}

for (const p of pages) {
  const canonical = `${siteUrl}/${p.slug}/`;
  const locale = p.lang === "fr" ? "fr_FR" : "en_US";
  const head = `${alternateLinks(p)}\n    <meta property="og:locale" content="${locale}" />`;

  const html = template
    .replace("<!--app-head-->", head)
    .replace("<!--app-html-->", p.appHtml)
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
    <p><a href="/en/">Continue to the English site</a> — <a href="/fr/">continuer en français</a></p>
  </body>
</html>
`,
);

const urls = pages.map(p => `  <url><loc>${siteUrl}/${p.slug}/</loc></url>`).join("\n");
writeFileSync(
  resolve(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
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
console.log("✓ generated dist/sitemap.xml + dist/robots.txt");

rmSync(resolve(dist, "server"), { recursive: true, force: true });
