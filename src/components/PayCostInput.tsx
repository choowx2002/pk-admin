"use client";

import { Powers, PowerType } from "@/types/constant";
import { PayCost } from "@/types/cost";
import { useEffect, useState } from "react";

interface PayCostFieldProps {
    value: PayCost;
    onChange: (payCost: PayCost) => void;
}

export default function PayCostInput({ value, onChange }: PayCostFieldProps) {
    const [paycost, setPaycost] = useState<PayCost>(value);

    const handleRuneChange = (option: PowerType) => {
        setPaycost((prev) => {
            const updatedRunes = prev.power.rune.includes(option)
                ? prev.power.rune.filter((rune) => rune !== option)
                : [...prev.power.rune, option];
            const count = updatedRunes.length > 0 ? prev.power.count : 0;
            return {
                ...prev,
                power: {
                    count,
                    rune: updatedRunes,
                },
            };
        });
    };

    useEffect(() => {
      onChange(paycost);
    }, [paycost])
    
    return (
        <div className="w-full p-4">
            <label className="block text-gray-700 font-semibold mb-2">
                Cost:
            </label>
            <div className="w-full">
                <label>Energy:</label>
                <input
                    type="number"
                    className="border-b ml-2"
                    onChange={(e) => {
                        const updated = { ...paycost };
                        updated.energy =
                            e.target.value === ""
                                ? 0
                                : parseInt(e.target.value) || 0;
                        setPaycost(updated);
                    }}
                    onBlur={(e) => {
                        const trimmedValue = e.target.value.replace(
                            /^0+(\d)/,
                            "$1"
                        );
                        const updated = { ...paycost };
                        updated.energy =
                            trimmedValue === ""
                                ? 0
                                : parseInt(trimmedValue) || 0;
                        setPaycost(updated);
                    }}
                />
            </div>
            <div className="w-full">
                <label>Power:</label>
                <div className="flex flex-wrap border rounded p-2">
                    <label>Runes: </label>
                    {Powers.map((option) => {
                        return (
                            <div
                                key={option}
                                className="flex items-center gap-2 ml-2"
                            >
                                <input
                                    type="checkbox"
                                    id={option}
                                    checked={paycost.power.rune.includes(
                                        option
                                    )}
                                    onChange={() => handleRuneChange(option)}
                                />
                                <label htmlFor={option}>{option}</label>
                            </div>
                        );
                    })}
                    {paycost?.power.rune && paycost?.power.rune.length > 0 && (
                        <div className="w-100">
                            <label>Count:</label>
                            <input
                                className="border-b ml-2"
                                type="number"
                                value={
                                    paycost.power.count === 0
                                        ? ""
                                        : paycost.power.count
                                }
                                onChange={(e) => {
                                    const updated = { ...paycost };
                                    updated.power.count =
                                        e.target.value === ""
                                            ? 0
                                            : parseInt(e.target.value) || 0;
                                    setPaycost(updated);
                                }}
                                onBlur={(e) => {
                                    const trimmedValue = e.target.value.replace(
                                        /^0+(\d)/,
                                        "$1"
                                    );
                                    const updated = { ...paycost };
                                    updated.power.count =
                                        trimmedValue === ""
                                            ? 0
                                            : parseInt(trimmedValue) || 0;
                                    setPaycost(updated);
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
