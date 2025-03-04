import { languageOption } from "@/types/constant"

const cnDict = [
    ["RUNE", "符文"],
    ["POWER", "符能"],
    ["ENERGY", "法力"],
    ["KEYWORDS", "词条"],
    ["KEYWORD", "词条"],
    ["MIGHT", "威力"],
    ["TYPE", "类型"],
    ["FACTION", "势力"],
    // keyword
    ["ACCELERATE", "急速"],
    ["ASSAULT", "强攻"],
    ["GANKING", "游走"],
    ["DEATHKNELL", "绝念"],
    ["TANK", "壁垒"],
    ["DEFLECT", "法盾"],
    ["SHIELD", "坚守"],
    ["LEGION", "鼓舞"],
    ["HIDDEN", "待命"],
    ["REACTION", "反应"],
    ["FOCUSED", "专注"],
    ["EPIC", "引导"],
    //faction
    ["BANDLE CITY", "班德尔城"],
    ["BILGEWATER", "比尔吉沃特"],
    ["DEMACIA", "德玛西亚"],
    ["FRELJORD", "弗雷尔卓德"],
    ["IONIA", "艾欧尼亚"],
    ["NOXUS", "诺克萨斯"],
    ["PILTOVER", "皮尔特沃夫"],
    ["SHADOW ISLES", "暗影岛"],
    ["SHURIMA", "恕瑞玛"],
    ["ZAUN", "祖安"],
    ["DRAGON", "巨龙"],
    ["DOG", "猎犬"],
    ["PIRATE", "海盗"],
    ["TRIFARIAN", "崔法利"],
    ["MECH", "机械"],
    ["SPIRIT", "灵魂"],
    ["YORDLE", "约德尔"],
    ["BIRD", "鸟兽"],
    ["ELITE", "精英"],
];



export const i18nText = (word: string, l: languageOption) => {
    if (!word) return "";
    let tword = word.toUpperCase();
    const map = cnDict.reduce((acc, [key, value]) => {
        acc.set(key, value);
        return acc;
    }, new Map<string, string>());
    switch (l) {
        case "cn":
            return map.get(tword) ?? word;
        case "en":
            return word;
        default:
            break;
    }
    return tword
}