"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Ampersand, Search } from "lucide-react";
import {
    CardType,
    CardTypes,
    languageOption,
    LanguageOptions,
    Powers,
    PowerType,
    runeColors,
} from "@/types/constant";
import { useRouter } from "next/navigation";
import {
    Keyword,
    KeywordDetails,
    KeywordList,
    KeywordType,
} from "@/types/keywords";
import fsPromises from "fs/promises";
import path from "path";

export interface Card {
    type: string;
    imgSrc?: string;
    cardId: string;
    name: string;
    runeColor?: string[];
    cost?: {
        energy: number;
        power: {
            rune: string[];
            count: number;
        };
    };
    keywords?: {
        name: string;
        level: number;
    }[];
    might?: number;
    description: string;
    faction?: string[];
}

interface CardDisplayProps {
    card: Card;
}

const CardDisplay: React.FC<CardDisplayProps> = ({ card }) => {
    const router = useRouter();
    return (
        <div
            className="inline-flex border mx-2 mb-2 rounded-xl shadow-lg overflow-hidden h-min w-[200px]"
            onClick={() => router.push(`/card?cardId=${card.cardId}`)}
        >
            {card?.imgSrc && (
                <Image
                    src={`/cardImg/${card?.imgSrc}`}
                    width={200}
                    height={300}
                    alt={card.name}
                    className="h-auto w-full"
                />
            )}
        </div>
    );
};

export default function CardsPage() {
    const [oriCards, setOriCards] = useState<Card[]>([]);
    const [selectedRunes, setSelectedRunes] = useState<PowerType[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<CardType[]>([]);
    const [selectedKeys, setSelectedKeys] = useState<KeywordType[]>([]);
    const [searchKey, setSearchKey] = useState<string>("");
    const [filteredCards, setFilteredCards] = useState<Card[]>([]);
    const [withAnd, setWithAnd] = useState(false);
    const [might, setMight] = useState({
        min: "",
        max: "",
    });
    const [energy, setEnergy] = useState({
        min: "",
        max: "",
    });
    const [power, setPower] = useState({
        min: "",
        max: "",
    });
    const [language, setlanguage] = useState<languageOption>("en");

    const fetchData = async () => {
        try {
            const response = await fetch(`/cards-${language}.json`);
            const data = await response.json();
            setOriCards(data);
            setFilteredCards(data);
        } catch (error) {
            console.error("Error fetching card data:", error);
        }
    };

    const inputHandler = (e: { target: { value: string } }, type: string) => {
        switch (type) {
            case "searchKey":
                setSearchKey(e.target.value);
                break;
            case "m-min":
                const updatedMin = { ...might };
                updatedMin.min = e.target.value;
                setMight(updatedMin);
                break;
            case "m-max":
                const updatedMax = { ...might };
                updatedMax.max = e.target.value;
                setMight(updatedMax);
                break;
            case "e-min":
                const updatedEMin = { ...energy };
                updatedEMin.min = e.target.value;
                setEnergy(updatedEMin);
                break;
            case "e-max":
                const updatedEMax = { ...energy };
                updatedEMax.max = e.target.value;
                setEnergy(updatedEMax);
                break;
            case "p-min":
                const updatedPMin = { ...power };
                updatedPMin.min = e.target.value;
                setPower(updatedPMin);
                break;
            case "p-max":
                const updatedPMax = { ...power };
                updatedPMax.max = e.target.value;
                setPower(updatedPMax);
                break;
            default:
                break;
        }
    };

    const languageChange = (e: { target: { value: string } }) => {
        setlanguage(e.target.value as languageOption);
    };

    const optionChange = (v: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(v.target.value);
        const value = v.target.value as KeywordType;
        const updated = new Set([...selectedKeys]);
        updated.add(value);
        setSelectedKeys(Array.from(updated));
    };

    const removeKeys = (index: number) => {
        const newTags = selectedKeys.filter((_, i) => i !== index);
        setSelectedKeys(newTags);
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchData();
    }, [language]);

    useEffect(() => {
        const tempCards = [...oriCards];
        let filtered = [];

        function checkRunes(runes: string[]) {
            if (!selectedRunes.length) return true;
            if (runes.length === 0) return false;
            if (withAnd) {
                for (const rune of selectedRunes) {
                    if (!runes.includes(rune)) return false;
                }
                return true;
            } else {
                for (const rune of runes) {
                    if (selectedRunes.includes(rune as PowerType)) return true;
                }
            }
        }

        function checkTypes(type: CardType) {
            if (!selectedTypes.length) return true;
            return selectedTypes.includes(type);
        }

        function checkMight(cMight: number | undefined) {
            if (might.min === "" && might.max === "") {
                return true;
            }
            if (!cMight) return false;
            const min = might.min !== "" ? Number(might.min) : -Infinity;
            const max = might.max !== "" ? Number(might.max) : Infinity;
            return cMight >= min && cMight <= max;
        }

        function checkEnergy(cEnergy: number | undefined) {
            if (energy.min === "" && energy.max === "") {
                return true;
            }
            if (cEnergy === undefined) return false;
            const min = energy.min !== "" ? Number(energy.min) : -Infinity;
            const max = energy.max !== "" ? Number(energy.max) : Infinity;
            return cEnergy >= min && cEnergy <= max;
        }

        function checkPower(cPower: number | undefined) {
            if (power.min === "" && power.max === "") {
                return true;
            }
            if (cPower === undefined) return false;
            const min = power.min !== "" ? Number(power.min) : -Infinity;
            const max = power.max !== "" ? Number(power.max) : Infinity;
            return cPower >= min && cPower <= max;
        }

        function checkKeywords(
            keywords: { name: string; level: number }[] | undefined
        ) {
            if (selectedKeys.length === 0) return true;
            if (!keywords || keywords.length === 0) return false;
            const keywordsList = keywords.map((k) => k.name);
            for (const k of keywordsList) {
                if (selectedKeys.includes(k as KeywordType)) return true;
            }
            return false;
        }

        filtered = tempCards.filter((c) => {
            const isInKey =
                searchKey.trim() === ""
                    ? true
                    : c.name.toLowerCase().includes(searchKey.toLowerCase()) ||
                      c.cardId.toLowerCase().includes(searchKey.toLowerCase());
            const isInRunes = checkRunes(c?.runeColor ?? []);
            const isInTypes = checkTypes(c.type as CardType);
            const isInMight = checkMight(c?.might);
            const isInEnergy = checkEnergy(c?.cost?.energy);
            const isInPower = checkPower(c?.cost?.power.count);
            const isInKeywords = checkKeywords(c?.keywords);
            return (
                isInKey &&
                isInRunes &&
                isInTypes &&
                isInMight &&
                isInEnergy &&
                isInPower &&
                isInKeywords
            );
        });

        setFilteredCards(filtered);
    }, [
        selectedRunes,
        searchKey,
        selectedTypes,
        withAnd,
        might,
        energy,
        power,
        selectedKeys,
    ]);

    return (
        <div>
            <header className="h-16 flex items-center px-4">
                <div className="font-extrabold text-3xl">Project K</div>
                <div className="ml-auto border-2 rounded-2xl py-1">
                    <select className="mx-1" value={language} onChange={languageChange}>
                        {LanguageOptions.map((l, i) => {
                            return (
                                <option value={l} key={i}>
                                    {l}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </header>
            <div className="min-[855px]:flex-nowrap min-[855px]:flex gap-4">
                <div className="p-2 min-w-[360px] min-[855px]:w-1/3">
                    <div className="flex mb-2 gap-1 py-1 items-center shadow-lg border-2 px-2 rounded-lg mx-2 h-12">
                        <Search />
                        <input
                            type="search"
                            placeholder="Card Id / Name"
                            value={searchKey}
                            onChange={(e) => inputHandler(e, "searchKey")}
                            className="px-2 py-1"
                        />
                    </div>
                    <div className="flex mb-2 items-center gap-1 mx-2 shadow-lg border-2 px-2 rounded-lg py-1 h-12">
                        <b>RUNE: </b>
                        {Powers.map((rune) => {
                            return (
                                <div
                                    key={rune}
                                    className={
                                        "shadow-lg rounded-4xl h-min overflow-hidden border-2 " +
                                        (selectedRunes.includes(rune)
                                            ? runeColors[rune]
                                            : "")
                                    }
                                >
                                    <img
                                        src={`/runes/${rune.toUpperCase()}.webp`}
                                        width={32}
                                        className={
                                            "transition-transform p-0.5 ease-out hover:scale-110 " +
                                            (selectedRunes.includes(rune)
                                                ? "white-image"
                                                : " ")
                                        }
                                        alt={rune}
                                        onClick={() => {
                                            const updated = [...selectedRunes];
                                            const foundIndex =
                                                updated.findIndex(
                                                    (r) => r === rune
                                                );
                                            if (foundIndex !== -1) {
                                                updated.splice(foundIndex, 1);
                                            } else {
                                                updated.push(rune);
                                            }
                                            setSelectedRunes(updated);
                                        }}
                                    />
                                </div>
                            );
                        })}
                        <div className="border-l-2 border-black">
                            <div
                                className={
                                    "ml-1 border-black border-2 select-none rounded-4xl " +
                                    (withAnd ? "bg-amber-400" : "")
                                }
                                onClick={() => {
                                    setWithAnd(!withAnd);
                                }}
                            >
                                <Ampersand className="p-0.5" size={32} />
                            </div>
                        </div>
                    </div>
                    <div className="flex mb-2 items-center gap-1 mx-2 shadow-lg border-2 px-2 rounded-lg py-1 h-12">
                        <b>TYPE: </b>
                        {CardTypes.map((type) => {
                            return (
                                <div
                                    key={type}
                                    className={
                                        "shadow-lg rounded-4xl h-min overflow-hidden border-2 "
                                    }
                                >
                                    <img
                                        src={`/icon/${type.toLowerCase()}.svg`}
                                        width={32}
                                        className={
                                            "transition-transform p-1 ease-out hover:scale-110 " +
                                            (selectedTypes.includes(type)
                                                ? "bg-amber-500"
                                                : " ")
                                        }
                                        alt={type}
                                        onClick={() => {
                                            const updated = [...selectedTypes];
                                            const foundIndex =
                                                updated.findIndex(
                                                    (r) => r === type
                                                );
                                            if (foundIndex !== -1) {
                                                updated.splice(foundIndex, 1);
                                            } else {
                                                updated.push(type);
                                            }
                                            setSelectedTypes(updated);
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex mb-2 items-center gap-1 mx-2 shadow-lg border-2 px-2 rounded-lg py-1 h-12">
                        <b>Might:</b>{" "}
                        <input
                            type="number"
                            min={0}
                            max={12}
                            className="flex-1 border-b-2"
                            placeholder="min"
                            value={might.min}
                            onChange={(e) => inputHandler(e, "m-min")}
                        />
                        <b>-</b>
                        <input
                            type="number"
                            min={0}
                            max={12}
                            className="flex-1 border-b-2"
                            placeholder="max"
                            value={might.max}
                            onChange={(e) => inputHandler(e, "m-max")}
                        />
                    </div>
                    <div className="flex mb-2 items-center gap-1 mx-2 shadow-lg border-2 px-2 rounded-lg py-1 h-12">
                        <b>Energy:</b>{" "}
                        <input
                            type="number"
                            min={0}
                            max={12}
                            className="flex-1 border-b-2"
                            placeholder="min"
                            value={energy.min}
                            onChange={(e) => inputHandler(e, "e-min")}
                        />
                        <b>-</b>
                        <input
                            type="number"
                            min={0}
                            max={12}
                            className="flex-1 border-b-2"
                            placeholder="max"
                            value={energy.max}
                            onChange={(e) => inputHandler(e, "e-max")}
                        />
                    </div>
                    <div className="flex mb-2 items-center gap-1 mx-2 shadow-lg border-2 px-2 rounded-lg py-1 h-12">
                        <b>Power:</b>{" "}
                        <input
                            type="number"
                            min={0}
                            max={12}
                            className="flex-1 border-b-2"
                            placeholder="min"
                            value={power.min}
                            onChange={(e) => inputHandler(e, "p-min")}
                        />
                        <b>-</b>
                        <input
                            type="number"
                            min={0}
                            max={3}
                            className="flex-1 border-b-2"
                            placeholder="max"
                            value={power.max}
                            onChange={(e) => inputHandler(e, "p-max")}
                        />
                    </div>
                    <div className="flex flex-wrap mb-2 items-center gap-1 mx-2 shadow-lg border-2 px-2 rounded-lg py-1">
                        {selectedKeys.map((keys, index) => {
                            const details = KeywordDetails[keys];
                            return (
                                <div
                                    key={index}
                                    className={
                                        "flex items-center px-2 py-1 rounded-lg " +
                                        details.bgColor +
                                        " " +
                                        details.color
                                    }
                                >
                                    {keys}
                                    <span
                                        className={
                                            "ml-2 cursor-pointer " +
                                            details.color
                                        }
                                        onClick={() => removeKeys(index)}
                                    >
                                        &times;
                                    </span>
                                </div>
                            );
                        })}
                        <select className="h-10 font-bold" onChange={(v) => optionChange(v)}>
                            <option value="none">Keyword</option>
                            {KeywordList.map((key, index) => {
                                return (
                                    !selectedKeys.includes(key) && (
                                        <option value={key} key={index}>
                                            {key}
                                        </option>
                                    )
                                );
                            })}
                        </select>
                    </div>
                    <div className="mb-2 h-12">
                        <button
                            type="button"
                            data-twe-ripple-init
                            data-twe-ripple-color="light"
                            className="mx-2 shadow-lg border-2 border-black px-2 rounded-lg py-1 h-full text-center font-bold bg-red-600 text-white"
                            onClick={() => {
                                setSearchKey("");
                                setSelectedRunes([]);
                                setSelectedTypes([]);
                                setWithAnd(false);
                                setMight({ min: "", max: "" });
                                setEnergy({ min: "", max: "" });
                                setPower({ min: "", max: "" });
                                setSelectedKeys([]);
                            }}
                        >
                            RESET
                        </button>
                    </div>
                </div>
                <div className="p-4 last:mx-auto justify-start">
                    {filteredCards?.length ? (
                        filteredCards.map((card: any) => (
                            <CardDisplay key={card.cardId} card={card} />
                        ))
                    ) : (
                        <li className="text-gray-500 italic">暂无卡牌</li>
                    )}
                </div>
            </div>
        </div>
    );
}
