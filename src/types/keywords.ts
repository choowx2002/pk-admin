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
  "Focused",
  "Epic"
] as const;

export type KeywordType = typeof KeywordList[number]
export interface Keyword {
  name: KeywordType;
  level: number;
}

interface KeywordInfo {
  name: KeywordType;
  cnName: string;
  bgColor: string;
  color: string;
  hasLevel: boolean;
}

export const KeywordDetails: Record<KeywordType, KeywordInfo> = {
  Accelerate: {
    name: 'Accelerate',
    cnName: '急速',
    color: "text-white",
    bgColor: "bg-red-700",
    hasLevel: false
  },
  Assault: {
    name: 'Assault',
    cnName: '强攻',
    color: 'text-white',
    bgColor: "bg-red-700",
    hasLevel: true
  },
  Ganking: {
    name: 'Ganking',
    cnName: '游走',
    color: 'text-white',
    bgColor: "bg-red-700",
    hasLevel: false
  },
  Deathknell: {
    name: 'Deathknell',
    cnName: '绝念',
    color: 'text-white',
    bgColor: "bg-[#617cbe]",
    hasLevel: false
  },
  Tank: {
    name: 'Tank',
    cnName: '壁垒',
    color: 'text-white',
    bgColor: "bg-teal-600",
    hasLevel: false
  },
  Deflect: {
    name: 'Deflect',
    cnName: '法盾',
    color: 'text-white',
    bgColor: "bg-teal-600",
    hasLevel: true
  },
  Shield: {
    name: 'Shield',
    cnName: '坚守',
    color: 'text-white',
    bgColor: "bg-teal-600",
    hasLevel: true
  },
  Legion: {
    name: 'Legion',
    cnName: '鼓舞',
    color: 'text-white',
    bgColor: "bg-[#8d7d33]",
    hasLevel: false
  },
  Hidden: {
    name: 'Hidden',
    cnName: '待命',
    color: 'text-white',
    bgColor: "bg-[#7962a9]",
    hasLevel: false
  },
  Reaction: {
    name: 'Reaction',
    cnName: '反应',
    color: 'text-white',
    bgColor: "bg-[#7962a9]",
    hasLevel: false
  },
  Focused: {
    name: "Focused",
    cnName: "专注",
    color: "text-white",
    bgColor: "bg-[#426db1]",
    hasLevel: false
  },
  Epic: {
    name: "Epic",
    cnName: "引导",
    bgColor: "text-white",
    color: "bg-[#8d7d33]",
    hasLevel: false
  }
};
