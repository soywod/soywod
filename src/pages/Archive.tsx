import { ReactNode } from "react";
import { parse } from "smol-toml";
import { DateTime, Interval } from "luxon";
import humanizeDuration from "humanize-duration";
import showdown from "showdown";
import { Lang } from "../lib/lang";
import en from "./Archive.en.json";
import fr from "./Archive.fr.json";
import "./Archive.css";

const COPY = { en, fr };

const projectTomls = import.meta.glob("../content/projects/*.toml", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;
const projectImages = import.meta.glob("../content/projects/*.jpeg", { eager: true }) as Record<
  string,
  { default: string }
>;
const experienceTomls = import.meta.glob("../content/experiences/*.toml", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;
const experienceImages = import.meta.glob("../content/experiences/*.jpeg", { eager: true }) as Record<
  string,
  { default: string }
>;

const converter = new showdown.Converter({ openLinksInNewWindow: true });

function tomlDate(value: unknown): string {
  return typeof value === "string" ? value : (value as Date).toISOString().slice(0, 10);
}

type Project = {
  key: string;
  title: string;
  subtitle: string;
  desc: string;
  image: string;
  tags: string[];
  draft: boolean;
  begin: string;
  end: string | null;
  link: string | null;
  sources: string | null;
};

type Experience = {
  key: string;
  title: string;
  company: string;
  companyLink: string | null;
  subcompany: string | null;
  subcompanyLink: string | null;
  image: string;
  desc: string;
  tags: string[];
  begin: string;
  end: string | null;
};

function loadProjects(lang: Lang): Project[] {
  return Object.entries(projectTomls)
    .map(([path, raw]): Project => {
      const toml = parse(raw) as any;
      return {
        key: path,
        title: toml.title,
        subtitle: toml[lang].subtitle,
        desc: converter.makeHtml(toml[lang].desc),
        image: projectImages[path.replace(/\.toml$/, ".jpeg")].default,
        tags: toml.tags ?? [],
        draft: toml.draft ?? false,
        begin: tomlDate(toml.begin),
        end: toml.end ? tomlDate(toml.end) : null,
        link: toml.link ?? null,
        sources: toml.sources ?? null,
      };
    })
    .filter(p => !p.draft)
    .sort((a, b) => (a.begin < b.begin ? 1 : a.begin > b.begin ? -1 : 0));
}

function loadExperiences(lang: Lang): Experience[] {
  return Object.entries(experienceTomls)
    .map(([path, raw]): Experience => {
      const toml = parse(raw) as any;
      return {
        key: path,
        title: toml[lang].title,
        company: toml.company,
        companyLink: toml.companyLink ?? null,
        subcompany: toml.subcompany ?? null,
        subcompanyLink: toml.subcompanyLink ?? null,
        image: experienceImages[path.replace(/\.toml$/, ".jpeg")].default,
        desc: converter.makeHtml(toml[lang].desc),
        tags: toml.tags ?? [],
        begin: tomlDate(toml.begin),
        end: toml.end ? tomlDate(toml.end) : null,
      };
    })
    .sort((a, b) => (a.begin < b.begin ? 1 : a.begin > b.begin ? -1 : 0));
}

function renderCompany(company: string, link?: string | null): ReactNode {
  return link ? (
    <a href={link} target="_blank" rel="noopener noreferrer">
      {company}
    </a>
  ) : (
    company
  );
}

interface CardProps {
  lang: Lang;
  title: ReactNode;
  subtitle: ReactNode;
  image: string;
  tags: string[];
  desc: string;
  begin: string;
  end: string | null;
  link: string | null;
  sourcesLink?: string | null;
  sourceCodeLabel?: string;
}

function Card(props: CardProps) {
  const begin = DateTime.fromISO(props.begin, { locale: props.lang });
  const end = props.end ? DateTime.fromISO(props.end, { locale: props.lang }) : DateTime.local();

  let beginStr = begin.toFormat("d LLL yyyy");
  let endStr = end.toFormat("d LLL yyyy");
  if (begin.year === end.year && begin.month === end.month) {
    beginStr = begin.toFormat("d");
  } else if (begin.year === end.year) {
    beginStr = begin.toFormat("LLL");
    endStr = end.toFormat("LLL yyyy");
  }

  const duration = Interval.fromDateTimes(begin, end).toDuration();
  const durationStr = humanizeDuration(duration.valueOf(), {
    language: props.lang,
    units: ["y", "mo", "d"],
    largest: 2,
    round: true,
  });

  return (
    <article className="card">
      <hr />
      <div className="card__head">
        {props.link ? (
          <a href={props.link} target="_blank" rel="noopener noreferrer" className="card__image">
            <img src={props.image} alt="" />
          </a>
        ) : (
          <span className="card__image">
            <img src={props.image} alt="" />
          </span>
        )}
        <div className="card__content">
          <h2 className="card__title">{props.title}</h2>
          <h3 className="card__subtitle">{props.subtitle}</h3>
          <div className="card__tags">
            {props.tags.map(tag => (
              <span key={tag} className="card__tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="card__times">
          <div>
            {beginStr} — {endStr}
          </div>
          <div>({durationStr})</div>
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: props.desc }} />
      {props.sourcesLink && (
        <div className="card__source">
          <a href={props.sourcesLink} target="_blank" rel="noopener noreferrer">
            {props.sourceCodeLabel ?? "Source code"}
          </a>
        </div>
      )}
    </article>
  );
}

export function ArchivePage({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const projects = loadProjects(lang);
  const experiences = loadExperiences(lang);

  return (
    <div className="prose">
      <h1>{t.title}</h1>
      <p>{t.intro}</p>

      <h2>{t.titleProjects}</h2>
      {projects.map(project => (
        <Card
          key={project.key}
          lang={lang}
          title={
            project.link ? (
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                {project.title}
              </a>
            ) : (
              project.title
            )
          }
          subtitle={project.subtitle}
          image={project.image}
          tags={project.tags}
          desc={project.desc}
          begin={project.begin}
          end={project.end}
          link={project.link}
          sourcesLink={project.sources}
          sourceCodeLabel={t.sourceCode}
        />
      ))}

      <h2>{t.titleExperiences}</h2>
      {experiences.map(experience => (
        <Card
          key={experience.key}
          lang={lang}
          title={experience.title}
          subtitle={
            <>
              @{renderCompany(experience.company, experience.companyLink)}
              {experience.subcompany && (
                <> (via {renderCompany(experience.subcompany, experience.subcompanyLink)})</>
              )}
            </>
          }
          image={experience.image}
          tags={experience.tags}
          desc={experience.desc}
          begin={experience.begin}
          end={experience.end}
          link={experience.companyLink}
        />
      ))}
    </div>
  );
}
