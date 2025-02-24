export const Powers = [
  "Furry",
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
