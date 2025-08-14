export type Locale = (typeof locales)[number];

export const locales = ["tr-TR", "en-US"] as const;
export const defaultLocale: Locale = "tr-TR";
