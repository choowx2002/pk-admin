import { PayCost, CardCost } from "./cost";
import { Keyword } from "./keywords";

/**
 * AbilityCost
 * Card Cost: exhaust, discard, recycle a card
 * Pay Cost: pay energy, power or both
 */
export type AbilityCost = PayCost | CardCost;

export const Triggers =[
  "onPlay",
  "onConquer",
  "onScore",
  "exhaust",
  "recycle",
  "activate",
  "onPlayUnit",
  "none",
] as const;
  
export type Trigger = typeof Triggers[number];

export interface Condition {
  attribute: string;
  operator: ">=" | ">" | "<=" | "<" | "==" | "!=";
  value: number | string | boolean;
  attribute2?: string;
}

export interface EffectAction {
  type: string;
  target?: string;
  [key: string]: any;
}

export interface Ability {
  description: string;
  trigger: Trigger;
  conditions: Condition[];
  cost: AbilityCost[];
  effects: EffectAction[];
  repeatable?: boolean;
}
