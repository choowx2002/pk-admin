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
  Fury: "bg-red-700",
  Mental: "bg-blue-400",
  Chaotic: "bg-purple-400",
  Physical: "bg-orange-400",
  Order: "bg-yellow-400",
  Calm: "bg-green-600",
};

export const runeColorsCss: Record<string, string> = {
  Fury: "#c10007", // red-400
  Mental: "#60a5fa", // blue-400
  Chaotic: "#c084fc", // purple-400
  Physical: "#fb923c", // orange-400
  Order: "#facc15", // yellow-400
  Calm: "#16a34a", // green-600
};


export const LanguageOptions = ["cn", "en"] as const;

export type languageOption = typeof LanguageOptions[number];