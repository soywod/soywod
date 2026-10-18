export type Lang = "en" | "fr" | "ru";

export const langs: Lang[] = ["en", "fr", "ru"];

export const locales: Record<Lang, string> = { en: "en_US", fr: "fr_FR", ru: "ru_RU" };

export const languageNames: Record<Lang, Record<Lang, string>> = {
  en: { en: "English version", fr: "French version", ru: "Russian version" },
  fr: { en: "Version anglaise", fr: "Version française", ru: "Version russe" },
  ru: { en: "Английская версия", fr: "Французская версия", ru: "Русская версия" },
};

export function parseLang(value: string | undefined): Lang {
  return langs.find(lang => lang === value) ?? "en";
}
