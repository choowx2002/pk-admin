import { Ability } from "./abilities";
import { CardType } from "./constant";
import { PayCost } from "./cost";
import { Keyword } from "./keywords";

export interface BaseCard {
  cardId: string;
  name: string;
  type: CardType;
  description: string;
}

export interface RuneCard extends BaseCard {
  type: "Rune";
  abilities?: Ability[];
}

export interface UnitCard extends BaseCard {
  type: "Unit";
  faction?: string[];
  might?: number;
  abilities?: Ability[];
  keywords?: Keyword[];
  cost?: PayCost;
}

export interface SpellCard extends BaseCard {
  type: "Spell";
  restriction?: {
    champion?: string;
  };
  abilities?: Ability[];
  keywords?: Keyword[];
  cost?: PayCost;
}

export interface GearCard extends BaseCard {
  type: "Gear";
  abilities?: Ability[];
  keywords?: Keyword[];
  cost?: PayCost;
}

export interface ChampionCard extends BaseCard {
  type: "Champion";
  faction?: string[];
  title?: string;
  might?: number;
  abilities?: Ability[];
  keywords?: Keyword[];
  cost?: PayCost;
}

export interface BattlefieldCard extends BaseCard {
  type: "Battlefield";
  abilities?: Ability[];
}

export interface LegendCard extends BaseCard {
  type: "Legend";
  champion?: string;
  runes?: string[];
  rarity?: string;
  abilities?: Ability[];
}

export type Card =
  | UnitCard
  | SpellCard
  | GearCard
  | ChampionCard
  | BattlefieldCard
  | LegendCard
  | RuneCard;
