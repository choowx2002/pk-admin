import { Power } from "./constant";

export interface PowerCost {
  rune: Power[];
  count: number;
}

export interface PayCost {
  energy?: number;
  power?: PowerCost;
}

export type AbilityCostFrom = "trash" | "hand" | "deck-bottom" | "self";

export type AbilityCostTo = "trash" | "hand" | "deck-bottom" | "rune-bottom";

export interface CardCost {
  type: "exhaust" | "discard" | "recycle";
  count: number;
  from: AbilityCostFrom;
  to?: AbilityCostTo;
}
