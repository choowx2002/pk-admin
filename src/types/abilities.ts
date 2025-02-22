import { PayCost, CardCost } from "./cost";
import { Keyword } from "./keywords";

/**
 * AbilityCost
 * Card Cost: exhaust, discard, recycle a card
 * Pay Cost: pay energy, power or both
 */
export type AbilityCost = PayCost | CardCost;

export type Trigger =
  | "onPlay"
  | "onConquer"
  | "onScore"
  | "exhaust"
  | "recycle"
  | "activate"
  | "onPlayUnit"
  | "none";

export interface Condition {
  attribute: string;
  operator: ">=" | ">" | "<=" | "<" | "==" | "!=";
  value: number;
}

export interface EffectAction {
  type: string;
  target?: string;
  [key: string]: any;
}

export interface Ability {
  keywords: Keyword[];
  description?: string;
  trigger?: Trigger;
  conditions?: Condition[];
  cost?: AbilityCost[] | null;
  effects?: EffectAction[];
  repeatable?: boolean;
}
