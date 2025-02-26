"use client"; // 让组件运行在浏览器端

import { useState, useEffect } from "react";
import Image from "next/image";
export default function CardsPage() {
    const [cards, setCards] = useState<Card[]>([]);
    const [loading, setLoading] = useState(true);
    // 获取卡牌列表
    useEffect(() => {
        console.log("✅ API 请求触发");
        async function fetchData() {
            try {
                const res = await fetch("cards.json");
                const data = await res.json();
                console.log(data);
                setCards((data as Card[]).sort((a, b) => {
                    if (a.name < b.name) {
                        return -1;
                    }
                    if (a.name > b.name) {
                        return 1;
                    }
                    return 0;
                }));
            } catch (err) {
                console.log("err", err);
            } finally {
                setLoading(false);
            }
        }

        fetchData()
    }, []);
    interface Card {
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
    const runeColors: Record<string, string> = {
        Fury: "text-red-400",
        Mental: "text-blue-400",
        Chaotic: "text-purple-400",
        Physical: "text-orange-400",
        Order: "text-yellow-400",
        Calm: "text-green-400",
    };

    const CardDisplay: React.FC<CardDisplayProps> = ({ card }) => {
        return (
            <div className="border rounded-xl p-4 shadow-lg bg-gray-800 text-white flex-1/5">
                {card?.imgSrc && (
                    <Image
                        src={`/cardImg/${card?.imgSrc}`}
                        width={200}
                        height={100}
                        alt={card.name}
                    />
                )}
                <h2 className="text-xl font-bold mb-2">
                    {card.name} ({card.type})
                </h2>
                <p className="text-sm text-gray-400">ID: {card.cardId}</p>
                <div className="flex">
                    {card.runeColor &&
                        card.runeColor.map((rune, index) => {
                            return (
                                <Image
                                    src={`/runes/${rune.toUpperCase()}.webp`}
                                    width={32}
                                    height={32}
                                    alt={rune}
                                    key={rune}
                                />
                                // <span
                                //     key={rune}
                                //     className={`font-semibold ${
                                //         runeColors[rune] || "text-gray-400"
                                //     }`}
                                // >
                                //     {rune}

                                // </span>
                            );
                        })}
                </div>
                {card.cost && (
                    <p className="text-sm">
                        Cost: {card.cost.energy} Energy, {card.cost.power.count}{" "}
                        {card.cost.power.rune.join(", ")}
                    </p>
                )}

                {card?.might && (
                    <p className="text-sm">
                        Might:{" "}
                        <span className="font-semibold text-red-400">
                            {card.might}
                        </span>
                    </p>
                )}

                {card?.faction && (
                    <p className="text-sm mt-2">
                        Faction: {card.faction.join(", ")}
                    </p>
                )}
                {card?.keywords && (
                    <p className="text-sm mt-2">
                        Keywords:{" "}
                        {card.keywords
                            .map((a) => a.name + a.level.toString())
                            .join(", ")}
                    </p>
                )}
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                <p>{card.description}</p>
            </div>
        );
    };

    if (loading) return <p>Loading...</p>;
    return (
        <div className="p-4 bg-slate-600 shadow rounded-lg flex flex-wrap gap-2">
            {cards?.length ? (
                cards.map((card: any) => (
                    <CardDisplay key={card.cardId} card={card} />
                ))
            ) : (
                <li className="text-gray-500 italic">暂无卡牌</li>
            )}
        </div>
    );
}
