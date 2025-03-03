"use client";
import cardsData from "@/data/cards-cn.json";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Card } from "@/components/CardListPage";
import Image from "next/image";

export default function NavigationEvents() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [card, setCard] = useState<Card>();
    useEffect(() => {
        const url = `${pathname}?${searchParams}`;
        console.log(url);
        const index = cardsData.findIndex(
            (c) => c.cardId === searchParams.get("cardId")
        );
        console.log(index);
        if (index >= 0) {
            setCard(cardsData[index]);
            console.log("card found", cardsData[index]);
        }
    }, [pathname, searchParams]);

    return (
        <div className="bg-amber-50 min-h-lvh">
            {card && (
                <div>
                    {card?.imgSrc && (
                        <Image
                            src={`/cardImg/${card?.imgSrc}`}
                            width={200}
                            height={300}
                            alt={card.name}
                            className="w-auto h-auto"
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
                                        title="this is rune"
                                    />
                                );
                            })}
                    </div>
                    {card.cost && (
                        <p className="text-sm">
                            Cost: {card.cost.energy} Energy,{" "}
                            {card.cost.power.count}{" "}
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
            )}
        </div>
    );
}
