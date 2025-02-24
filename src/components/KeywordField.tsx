"use client";

import { Keyword, KeywordList } from "@/types/keywords";
import { useState } from "react";

interface KeywordFieldProps {
    value?: Keyword[];
    onChange: (abilities: Keyword[]) => void;
}

export default function KeywordField ({ value = [], onChange }: KeywordFieldProps) {
    const [keywords, setKeywords] = useState<Keyword[]>(value);

    const handleOnAdd = () => {
        const newKeywords: Keyword = {
            name: "Accelerate",
            level: 1,
        };
        const updatedKeywords = [...keywords, newKeywords];
        setKeywords(updatedKeywords);
        onChange(updatedKeywords);
    };

    const handleOnRemove = (index: number) => {
        const updatedKeywords = keywords.filter((_, i) => i !== index);
        setKeywords(updatedKeywords);
        onChange(updatedKeywords);
    };

    return (
        <div className="w-full p-4">
            <label className="block text-gray-700 font-semibold mb-2">
                Keywords:
            </label>
            {keywords.map((keyword, index) => {
                return (
                    <div key={index}>
                        <label>Name</label>
                        <select
                            value={keyword.name}
                            onChange={(e) => {
                                const updated = [...keywords];
                                updated[index].name = e.target
                                    .value as Keyword["name"];
                                setKeywords(updated);
                                onChange(updated);
                            }}
                        >
                            {KeywordList.map((keyword, index) => {
                                return (
                                    <option key={index} value={keyword}>
                                        {keyword}
                                    </option>
                                );
                            })}
                        </select>

                        {["Assault", "Shield"].includes(
                            keywords[index].name
                        ) && (
                            <div>
                                <label>Level</label>
                                <input
                                    type="number"
                                    name="level"
                                    value={keyword.level}
                                    step={1}
                                    onChange={(e) => {
                                        const updated = [...keywords];
                                        updated[index].level = parseInt(
                                            e.target.value
                                        ) as Keyword["level"];
                                        setKeywords(updated);
                                        onChange(updated);
                                    }}
                                />
                            </div>
                        )}
                        <button
                            type="button"
                            onClick={() => handleOnRemove(index)}
                            className="bg-red-500 text-white p-2 mt-2 rounded"
                        >
                            Remove
                        </button>
                    </div>
                );
            })}
            <button
                type="button"
                onClick={handleOnAdd}
                className="bg-blue-500 text-white p-2 mt-2 rounded"
            >
                Add
            </button>
        </div>
    );
}
