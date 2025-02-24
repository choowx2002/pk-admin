/**
 * Keywords represent different abilities or effects that can be applied to units in the game.
 * Each keyword modifies the behavior of a unit in a specific way during gameplay.
 *
 * - Accelerate: Allows the unit to become ready for battle immediately by paying additional rune costs.
 * - Assault: Grants extra attack power when the unit initiates an attack (e.g., Assault 2 provides +2 attack power).
 * - Ganking: Enables the unit to move between different battlefields without returning to base first.
 * - Deathknell: Triggers a specific effect when the unit with this keyword dies.
 * - Tank: Forces opponents to target this unit first in combat before attacking others.
 * - Deflect: Opponents must retrieve a certain number of runes before they can target this unit with spells or effects.
 * - Shield: Provides additional defense power when the unit is used to defend.
 * - Legion: Grants an extra bonus if another card has been played before playing this card.
 * - Hidden: Allows a card to be played face-down in a conquered battlefield and activated later for a rune cost.
 * - Reaction: Can only be played in response to other spells or abilities.
 */
export const KeywordList = [
  "Accelerate",
  "Assault",
  "Ganking",
  "Deathknell",
  "Tank",
  "Deflect",
  "Shield",
  "Legion",
  "Hidden",
  "Reaction",
] as const;

export type KeywordType = typeof KeywordList[number]
export interface Keyword {
  name: KeywordType;
  level: number;
}
