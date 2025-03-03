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

export const runeColors: Record<string, string> = {
  Fury: "bg-red-400",
  Mental: "bg-blue-400",
  Chaotic: "bg-purple-400",
  Physical: "bg-orange-400",
  Order: "bg-yellow-400",
  Calm: "bg-green-600",
};

export const LanguageOptions = ["cn", "en"] as const;

export type languageOption = typeof LanguageOptions[number];