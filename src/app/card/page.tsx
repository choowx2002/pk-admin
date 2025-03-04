"use client";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Card } from "@/components/CardListPage";
import Image from "next/image";
import useLocalStorageState from "use-local-storage-state";
import { languageOption, runeColors, runeColorsCss } from "@/types/constant";
import { i18nText } from "@/helpers/i18n";
import { replaceKeywords } from "@/types/keywords";

export default function NavigationEvents() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [card, setCard] = useState<Card | undefined>();
    const [language, setlanguage] = useLocalStorageState<languageOption>(
        "userLanguage",
        {
            defaultValue: "cn",
        }
    );

    const fetchData = async () => {
        try {
            const url = `${pathname}?${searchParams}`;
            const response = await fetch(`/cards-${language}.json`);
            const data = await response.json();
            const index = data.findIndex(
                (c: Card) => c.cardId === searchParams.get("cardId")
            );
            if (index >= 0) {
                setCard(data[index]);
            }
        } catch (error) {
            console.error("Error fetching card data:", error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [pathname, searchParams]);

    if (!card) {
        return <div>暂无卡牌</div>;
    }

    function checkRuneColor(rune: string[]): string {
        if (rune.length === 1) {
            return runeColorsCss[rune[0]] || "bg-gray-400";
        }
        if (rune.length === 2) {
            const color1 = runeColorsCss[rune[0]] || "rgba(100,100,100,1)";
            const color2 = runeColorsCss[rune[1]] || "rgba(150,150,150,1)";
            return `linear-gradient(120deg, ${color1} 0%, ${color2} 100%)`;
        }
        return "transparent";
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="px-4 py-1 grid grid-cols-3 gap-1 max-[700px]:block max-w-3xl">
                {/* image */}
                <div className="col-span-1 my-auto">
                    {card?.imgSrc && (
                        <Image
                            src={`/cardImg/${card?.imgSrc}`}
                            width={200}
                            height={300}
                            alt={card.name}
                            className="w-[250px] aspect-[113/161.5] rounded-lg min-w-[200px] mx-auto my-5"
                        />
                    )}
                </div>

                <div className="col-span-2 m-2 ml-0 pl-2 text-center justify-center content-center flex flex-wrap my-auto">
                    {/* card id */}
                    {/* <p className="text-center w-full text-sm text-gray-400">
                        ID: {card.cardId}
                    </p> */}

                    {/* card name */}
                    <fieldset className="w-full rounded-lg border-2">
                        <legend className="flex items-center justify-center mb-2 px-2 gap-1">
                            <h2 className="text-4xl font-bold">{card.name}</h2>
                            <img
                                src={`/icon/${card.type.toLowerCase()}.svg`}
                                alt={card.type}
                                width={32}
                            />
                        </legend>

                        {/* card title/champion's belong */}
                        {card?.title ||
                            (card?.champion && (
                                <div className="text-bold italic">
                                    {card.title ?? card.champion}
                                </div>
                            ))}

                        {/* rune, energy, power */}
                        <div className="flex justify-center items-stretch gap-2">
                            {card.runeColor.length > 0 && (
                                <fieldset className="rounded-lg border-2 px-4 py-1 flex justify-center items-center gap-2">
                                    <legend className="font-bold">
                                        {i18nText("Rune", language)}
                                    </legend>
                                    {card.runeColor &&
                                        card.runeColor.map((rune, index) => {
                                            return (
                                                <div
                                                    key={rune}
                                                    className={
                                                        "shadow-lg rounded-4xl overflow-hidden border-2 " +
                                                        runeColors[rune]
                                                    }
                                                >
                                                    <img
                                                        src={`/runes/${rune.toUpperCase()}.webp`}
                                                        width={32}
                                                        alt={rune}
                                                        className="white-image"
                                                    />{" "}
                                                </div>
                                            );
                                        })}
                                </fieldset>
                            )}

                            {card.cost?.energy !== undefined && (
                                <fieldset className="rounded-lg border-2 px-4 py-1 flex justify-center gap-2">
                                    <legend className="font-bold">
                                        {i18nText("Energy", language)}
                                    </legend>
                                    <div>
                                        <img
                                            src={`/icon/energy-${
                                                card.cost.energy <= 5
                                                    ? card.cost?.energy
                                                    : 5
                                            }.svg`}
                                            width={36}
                                            className="m-1 rounded-4xl drop-shadow-lg"
                                            alt=""
                                        />
                                    </div>
                                </fieldset>
                            )}

                            {card.cost?.power.count ? (
                                <fieldset className="rounded-lg border-2 px-4 py-1 flex justify-center gap-2">
                                    <legend className="font-bold">
                                        {i18nText("Power", language)}
                                    </legend>
                                    <div
                                        className="shadow-lg rounded-4xl border-black overflow-hidden border-2 w-9 h-9 flex justify-center items-center bg-black text-white font-extrabold m-1"
                                        style={{
                                            background: checkRuneColor(
                                                card.cost?.power.rune
                                            ),
                                        }}
                                    >
                                        {card.cost?.power.count}
                                    </div>
                                </fieldset>
                            ) : (
                                ""
                            )}
                        </div>

                        {/* horizontal line */}
                        <hr className="h-px border-1 mt-8 bg-black dark:bg-black" />

                        {/* description */}
                        <div className="px-4 py-2 text-start">
                            <p
                                className="whitespace-pre-wrap"
                                dangerouslySetInnerHTML={{
                                    __html: replaceKeywords(card.description),
                                }}
                            />

                            {card.faction?.map((f, i) => {
                                return (
                                    <div
                                        key={f}
                                        className="bg-black text-white inline-block px-2 py-0.5 mt-2 mb-1 text-[10px] italic rounded-lg tracking-[1.5px] mr-2"
                                    >
                                        {i18nText(f, language)}
                                    </div>
                                );
                            })}
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>
    );
}
