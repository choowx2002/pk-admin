export type Power =
  | "Furry"
  | "Mental"
  | "Chaotic"
  | "Physical"
  | "Calm"
  | "Order";

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
