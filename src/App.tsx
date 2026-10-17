import { parseLang } from "./lib/lang";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/Home";
import { ArchivePage } from "./pages/Archive";
import { ContactPage } from "./pages/Contact";

/*
 * Every page is prerendered at build time (see prerender.js), so this is not
 * a router; it just picks {lang, page} for one URL: /en/, /en/archive/,
 * /en/contact/ and the fr/ equivalents. The dev server falls back to
 * index.html for every path, and this switch serves it from the browser's
 * current pathname (see main.tsx).
 */
export default function App({ url }: { url: string }) {
  const segments = url.replace(/^\/+|\/+$/g, "").split("/").filter(Boolean);
  const lang = parseLang(segments[0]);
  const slug = segments.slice(1).join("/");
  const path = slug ? `${slug}/` : "";

  const page =
    slug === "archive" ? (
      <ArchivePage lang={lang} />
    ) : slug === "contact" ? (
      <ContactPage lang={lang} />
    ) : (
      <HomePage lang={lang} />
    );

  return (
    <>
      <Nav lang={lang} path={path} />
      <main>{page}</main>
      <Footer lang={lang} />
    </>
  );
}
