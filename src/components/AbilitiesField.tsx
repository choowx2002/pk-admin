"use client";

import { Ability, Triggers } from "@/types/abilities";
import { useState } from "react";
import ConditionBuilder from "./ConditionalBuilder";

interface AbilitiesFieldProps {
    value?: Ability[];
    onChange: (abilities: Ability[]) => void;
}

export default function AbilitiesField({
    value = [],
    onChange,
}: AbilitiesFieldProps) {
    const [abilities, setAbilities] = useState<Ability[]>(value);

    const handleAddAbility = () => {
        const newAbility: Ability = {
            description: "",
            trigger: "none",
            conditions: [],
            cost: [],
            effects: [],
            repeatable: true,
        };
        const updatedAbilities = [...abilities, newAbility];
        setAbilities(updatedAbilities);
        onChange(updatedAbilities);
    };

    const handleRemoveAbility = (index: number) => {
        const updatedAbilities = abilities.filter((_, i) => i !== index);
        setAbilities(updatedAbilities);
        onChange(updatedAbilities);
    };

    return (
        <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Abilities</h3>

            {abilities.map((ability, index) => (
                <div
                    key={index}
                    className="p-2 mb-2 border rounded bg-white shadow"
                >
                    <label className="block text-sm font-medium">
                        Description
                    </label>
                    <input
                        type="text"
                        value={ability.description || ""}
                        onChange={(e) => {
                            const updated = [...abilities];
                            updated[index].description = e.target.value;
                            setAbilities(updated);
                            onChange(updated);
                        }}
                        className="border p-2 w-full"
                    />

                    <label className="block text-sm font-medium mt-2">
                        Trigger
                    </label>
                    <select
                        value={ability.trigger}
                        onChange={(e) => {
                            const updated = [...abilities];
                            updated[index].trigger = e.target
                                .value as Ability["trigger"];
                            setAbilities(updated);
                            onChange(updated);
                        }}
                        className="border p-2 w-full"
                    >
                        {Triggers.map((trigger, index) => {
                            return (
                                <option key={index} value={trigger}>
                                    {trigger}
                                </option>
                            );
                        })}
                    </select>

                    <div className="block">
                        <label htmlFor="conditions" className="block">
                            Conditions
                        </label>
                        <ConditionBuilder
                            value={[]}
                            onConditionsChange={(v) => {
                                const updated = [...abilities];
                                updated[index].conditions = v;
                                setAbilities(updated);
                                onChange(updated);
                            }}
                        />
                    </div>

                    <div className="block">
                        <label htmlFor="repeat">Repeatable</label>
                        <input
                            type="checkbox"
                            name="repeat"
                            checked={ability.repeatable}
                            onChange={(e) => {
                                const updated = [...abilities];
                                updated[index].repeatable = e.target
                                    .checked as Ability["repeatable"];
                                setAbilities(updated);
                                onChange(updated);
                            }}
                        />
                    </div>

                    <button
                        type="button"
                        onClick={() => handleRemoveAbility(index)}
                        className="bg-red-500 text-white p-2 mt-2 rounded"
                    >
                        Remove
                    </button>
                </div>
            ))}

            <button
                type="button"
                onClick={handleAddAbility}
                className="bg-blue-500 text-white p-2 mt-2 rounded"
            >
                + Add Ability
            </button>
        </div>
    );
}
