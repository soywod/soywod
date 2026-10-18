import { parseLang } from "./lib/lang";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/Home";
import { ArchivePage } from "./pages/Archive";
import { observeAnimations } from "./lib/anim";

const ANIM_SCRIPT = `(${observeAnimations.toString()})();`;

export default function App({ url }: { url: string }) {
  const segments = url.replace(/^\/+|\/+$/g, "").split("/").filter(Boolean);
  const lang = parseLang(segments[0]);
  const slug = segments.slice(1).join("/");
  const path = slug ? `${slug}/` : "";

  const page =
    slug === "archive" ? <ArchivePage lang={lang} /> : <HomePage lang={lang} />;

  return (
    <>
      <Nav lang={lang} path={path} />
      <main>{page}</main>
      <Footer lang={lang} />
      <script dangerouslySetInnerHTML={{ __html: ANIM_SCRIPT }} />
    </>
  );
}
