export const Powers = [
  "Fury",
  "Mental",
  "Chaotic",
  "Physical",
  "Calm",
  "Order",
] as const;
export type PowerType = typeof Powers[number]

export const CardTypes = [
  "Rune",
  "Unit",
  "Spell",
  "Gear",
  "Champion",
  "Battlefield",
  "Legend",
] as const;

export type CardType = typeof CardTypes[number];

export const runeColorsCss: Record<string, string> = {
  Fury: "#ad3429",
  Mental: "#577ba3",
  Chaotic: "#9a7aa9",
  Physical: "#e4a05c",
  Order:  "#fcc809",
  Calm: "#64a165",
};


export const LanguageOptions = ["cn", "en"] as const;

export type languageOption = typeof LanguageOptions[number];