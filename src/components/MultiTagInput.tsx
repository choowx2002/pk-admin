"use client";

import { useState } from "react";

interface MultiTagInputProps {
    title: string;
    initialTags?: string[];
    onChange: (tags: string[]) => void;
}

// TODO: add recommendation for tag
export default function MultiTagInput({
    title,
    initialTags = [],
    onChange,
}: MultiTagInputProps) {
    const [tags, setTags] = useState<string[]>(initialTags);
    const [inputValue, setInputValue] = useState("");

    const addTag = () => {
        const trimmedValue = inputValue.trim();
        if (trimmedValue && !tags.includes(trimmedValue)) {
            const newTags = [...tags, trimmedValue];
            setTags(newTags);
            onChange(newTags);
        }
        setInputValue("");
    };

    const removeTag = (index: number) => {
        const newTags = tags.filter((_, i) => i !== index);
        setTags(newTags);
        onChange(newTags);
    };

    return (
        <div className="w-full p-4">
            <label className="block text-gray-700 font-semibold mb-2">
                {title}:
            </label>
            <div className="flex flex-wrap gap-2 border p-2 rounded items-center">
                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                            <div
                                key={index}
                                className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-lg"
                            >
                                {tag}
                                <span
                                    className="ml-2 text-red-500 cursor-pointer"
                                    onClick={() => removeTag(index)}
                                >
                                    &times;
                                </span>
                            </div>
                        ))}
                    </div>
                )}
                <input
                    type="text"
                    className="w-max p-2 flex-grow min-w-[100px] outline-none"
                    placeholder={`Add a ${title.toLowerCase()}...`}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                        if(e.key === "Enter"){
                            e.preventDefault();
                            addTag()
                        }
                    }}
                />
            </div>
        </div>
    );
}
