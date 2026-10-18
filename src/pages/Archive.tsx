import { parse } from "smol-toml";
import { Lang } from "../lib/lang";
import { ANIM } from "../lib/anim";
import { markdown, rich } from "../lib/markdown";
import en from "./Archive.en.json";
import fr from "./Archive.fr.json";
import ru from "./Archive.ru.json";
import "./Archive.css";

const COPY = { en, fr, ru };

const projectTomls = import.meta.glob("../content/projects/*.toml", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;
const experienceTomls = import.meta.glob("../content/experiences/*.toml", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;
const images = import.meta.glob("../content/*/*.webp", {
  query: "?url",
  import: "default",
  eager: true,
}) as Record<string, string>;

const CURRENT_PROJECTS = ["himalaya"];

const MAX_TAGS = 6;

type Row = {
  key: string;
  image: string | undefined;
  when: string;
  name: string;
  link: string | null;
  detail: string;
  desc: string | null;
  tags: string[];
};

function imageOf(tomlPath: string): string | undefined {
  return images[tomlPath.replace(/\.toml$/, ".webp")];
}

function tomlDate(value: unknown): string {
  return typeof value === "string" ? value : (value as Date).toISOString().slice(0, 10);
}

function years(begin: string, end: string | null): string {
  const from = begin.slice(0, 4);
  const to = (end ?? begin).slice(0, 4);
  return from === to ? from : `${from}–${to}`;
}

function byBeginDesc<T extends { begin: string }>(a: T, b: T): number {
  return a.begin < b.begin ? 1 : a.begin > b.begin ? -1 : 0;
}

export function loadExperiences(lang: Lang): Row[] {
  const experiences = Object.entries(experienceTomls)
    .map(([path, raw]) => {
      const toml = parse(raw) as any;
      return {
        key: path,
        company: toml.company as string,
        link: (toml.companyLink as string | undefined) ?? null,
        title: (toml[lang] ?? toml.en).title as string,
        tags: (toml.tags as string[] | undefined) ?? [],
        begin: tomlDate(toml.begin),
        end: toml.end ? tomlDate(toml.end) : null,
      };
    })
    .sort(byBeginDesc);

  const groups = new Map<string, typeof experiences>();
  for (const experience of experiences) {
    const group = groups.get(experience.company) ?? [];
    group.push(experience);
    groups.set(experience.company, group);
  }

  return [...groups.values()].map(group => {
    const latest = group[0];
    const earliest = group[group.length - 1];
    const titles = [...new Set(group.map(e => e.title))];
    const tags = [...new Set(group.flatMap(e => e.tags))];
    return {
      key: latest.key,
      image: imageOf(latest.key),
      when: years(earliest.begin, latest.end),
      name: latest.company,
      link: latest.link,
      detail: titles.join(", "),
      desc: null,
      tags: tags.slice(0, MAX_TAGS),
    };
  });
}

export function loadProjects(lang: Lang): Row[] {
  return Object.entries(projectTomls)
    .map(([path, raw]) => {
      const toml = parse(raw) as any;
      return { path, toml, begin: tomlDate(toml.begin) };
    })
    .filter(({ path, toml }) => !toml.draft && !CURRENT_PROJECTS.some(name => path.endsWith(`/${name}.toml`)))
    .sort(byBeginDesc)
    .map(({ path, toml, begin }) => ({
      key: path,
      image: imageOf(path),
      when: years(begin, toml.end ? tomlDate(toml.end) : null),
      name: toml.title as string,
      link: (toml.link as string | undefined) ?? null,
      detail: ((toml[lang] ?? toml.en).subtitle as string).replace(/\s+—\s+/g, " · "),
      desc: (toml[lang] ?? toml.en).desc ? markdown((toml[lang] ?? toml.en).desc as string) : null,
      tags: ((toml.tags as string[] | undefined) ?? []).slice(0, MAX_TAGS),
    }));
}

function Rows({ rows }: { rows: Row[] }) {
  return (
    <ul className="rows">
      {rows.map(row => (
        <li key={row.key} className={`rows__item ${ANIM}`}>
          {row.image ? (
            <img className="rows__image" src={row.image} alt="" width={112} height={70} loading="lazy" />
          ) : (
            <span className="rows__image" aria-hidden="true" />
          )}
          <span className="rows__when">{row.when}</span>
          <span>
            {row.link ? (
              <a className="rows__name" href={row.link} target="_blank" rel="noopener noreferrer">
                {row.name}
              </a>
            ) : (
              <span className="rows__name">{row.name}</span>
            )}
            <br />
            <span className="rows__detail">{row.detail}</span>
          </span>
          <span className="rows__tags">{row.tags.join(", ")}</span>
          {row.desc && <div className="rows__desc" dangerouslySetInnerHTML={{ __html: row.desc }} />}
        </li>
      ))}
    </ul>
  );
}

export function ArchivePage({ lang }: { lang: Lang }) {
  const t = COPY[lang];

  return (
    <>
      <section className="archive-head">
        <div className={`container ${ANIM}`}>
          <p className="label">{t.label}</p>
          <h1 className="archive-head__title">{t.title}</h1>
          <p className="archive-head__intro" dangerouslySetInnerHTML={rich(t.intro)} />
        </div>
      </section>

      <section className="archive-part">
        <div className="container">
          <h2 className="archive-part__title">{t.titleExperiences}</h2>
          <Rows rows={loadExperiences(lang)} />
        </div>
      </section>

      <section className="archive-part archive-part--last">
        <div className="container">
          <h2 className="archive-part__title">{t.titleProjects}</h2>
          <Rows rows={loadProjects(lang)} />
        </div>
      </section>
    </>
  );
}
