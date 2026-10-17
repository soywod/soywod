export type Lang = "en" | "fr";

export const langs: Lang[] = ["en", "fr"];

export function parseLang(value: string | undefined): Lang {
  return value === "fr" ? "fr" : "en";
}
