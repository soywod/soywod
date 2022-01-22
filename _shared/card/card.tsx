import {FC, ReactElement} from "react";
import {DateTime, Interval} from "luxon";
import humanizeDuration from "humanize-duration";

import {LangProps} from "../i18n";
import Link from "../link";
import Img from "../img";
import cs from "./card.module.scss";

function renderDateRange(d1: DateTime, d2: DateTime, fmt: string, suffixFmt?: string): string {
  const range = `${d1.toFormat(fmt)} — ${d2.toFormat(fmt)}`;
  const suffix = suffixFmt ? d1.toFormat(suffixFmt) : "";
  return range + suffix;
}

export type CardProps = LangProps & {
  title: ReactElement<any, any>;
  subtitle: ReactElement<any, any>;
  image: string;
  tags: Array<string>;
  desc: string;
  begin: string;
  end: string | null;
  link: string | null;
  sourcesLink: string | null;
};

export const Card: FC<CardProps> = props => {
  let date = "";
  const begin = DateTime.fromISO(props.begin, {locale: props.lang});
  const end = props.end ? DateTime.fromISO(props.end, {locale: props.lang}) : DateTime.local();

  if (begin.month === end.month) {
    date = renderDateRange(begin, end, "d", " LLL yyyy");
  } else if (begin.year === end.year) {
    date = renderDateRange(begin, end, "LLL", " yyyy");
  } else {
    date = renderDateRange(begin, end, "LLL yyyy");
  }

  const duration = humanizeDuration(Interval.fromDateTimes(begin, end).toDuration().valueOf(), {
    language: props.lang,
    units: ["y", "mo", "w", "d"],
    round: true,
    largest: 2,
  });

  return (
    <>
      <hr />
      <div className={cs.container}>
        {props.link ? (
          <Link className={cs.imageLink} to={props.link}>
            <div className={cs.imageContainer}>
              <Img src={props.image} className={cs.image} />
            </div>
          </Link>
        ) : (
          <div className={cs.imageContainer}>
            <Img src={props.image} className={cs.image} />
          </div>
        )}
        <div className={cs.content}>
          <h2 className={cs.title}>{props.title}</h2>
          <h3 className={cs.subtitle}>{props.subtitle}</h3>
          <div className={cs.tags}>
            {props.tags.map(tag => (
              <span key={tag} className={cs.tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className={cs.times}>
          <time>{date}</time>
          <time>({duration})</time>
        </div>
      </div>

      <div dangerouslySetInnerHTML={{__html: props.desc}} />

      {props.sourcesLink && (
        <div className={cs.linkContainer}>
          <Link className={cs.link} to={props.sourcesLink}>
            <span>Code source</span>
            <svg
              aria-hidden="true"
              focusable="false"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="0.75rem"
            >
              <path
                fill="currentColor"
                d="M384 320c-17.67 0-32 14.33-32 32v96H64V160h96c17.67 0 32-14.32 32-32s-14.33-32-32-32L64 96c-35.35 0-64 28.65-64 64V448c0 35.34 28.65 64 64 64h288c35.35 0 64-28.66 64-64v-96C416 334.3 401.7 320 384 320zM502.6 9.367C496.8 3.578 488.8 0 480 0h-160c-17.67 0-31.1 14.32-31.1 31.1c0 17.67 14.32 31.1 31.99 31.1h82.75L178.7 290.7c-12.5 12.5-12.5 32.76 0 45.26C191.2 348.5 211.5 348.5 224 336l224-226.8V192c0 17.67 14.33 31.1 31.1 31.1S512 209.7 512 192V31.1C512 23.16 508.4 15.16 502.6 9.367z"
              />
            </svg>
          </Link>
        </div>
      )}
    </>
  );
};

export default Card;
