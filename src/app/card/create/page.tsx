"use client"; // 让组件运行在浏览器端

import { useState } from "react";
import axios from "axios";
import { BaseCard, Card, UnitCard } from "@/types/cards";
import { BaseCardForm, RuneCardForm, UnitCardForm } from "@/types/forms";
import AbilitiesField from "@/components/AbilitiesField";
import KeywordField from "@/components/KeywordField";
import MultiTagInput from "@/components/MultiTagInput";
import PayCostInput from "@/components/PayCostInput";

export default function CardsPage() {
    const [formTemplate, setFormTemplate] = useState(BaseCardForm);
    const [form, setForm] = useState<BaseCard>({
        name: "",
        cardId: "",
        type: "Unit",
        description: "",
    });

    // 提交表单
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const fieldNameList = formTemplate.map((x) => x.name);
        console.log(fieldNameList);
        console.log(form);
        // await axios.post("http://localhost:4000/cards", form);
        // setForm({ name: "", cardId: "", type: "Unit", description: "" });
    };

    const optionChange = (v: React.ChangeEvent<HTMLSelectElement>) => {
        let tempForm = BaseCardForm;
        const key = v.target.value;
        switch (key) {
            case "Rune":
                tempForm = BaseCardForm.concat(RuneCardForm);
                setFormTemplate(tempForm);
                break;
            case "Unit":
                tempForm = BaseCardForm.concat(UnitCardForm);
                const newUnit: UnitCard = {
                    type: "Unit",
                    cardId: form.cardId,
                    name: form.name,
                    description: form.description,
                    faction: [],
                    might: 0,
                    abilities: [],
                    keywords: [],
                    cost: {
                        energy: 0,
                        power: {
                            rune: [],
                            count: 0,
                        },
                    },
                };
                console.log({ ...newUnit });
                setFormTemplate(tempForm);
                setForm(newUnit);
                break;
            default:
                break;
        }
    };

    return (
        <div>
            <h1 className="title">添加卡牌</h1>

            <form onSubmit={(e) => e.preventDefault()} className="bg-gray-100">
                {formTemplate.map(function (field, index) {
                    switch (field.type) {
                        case "text":
                            return (
                                <div
                                    key={`${field.name}-${index}`}
                                    className="w-full p-4 flex items-center"
                                >
                                    <label className="block text-gray-700 font-semibold ">
                                        {field.label}:
                                    </label>
                                    <input
                                        className="border-b ml-2"
                                        required={field.required}
                                        name={field.name}
                                        type="text"
                                        placeholder={field?.placeholder}
                                        onChange={(e) => {
                                            const updated = { ...form };
                                            const key =
                                                field.name as keyof typeof form;
                                            if (key !== "type")
                                                updated[key] = e.target.value;
                                            setForm(updated);
                                        }}
                                    />
                                </div>
                            );
                        case "select":
                            return (
                                <div
                                    key={`${field.name}-${index}`}
                                    className="w-full p-4 flex"
                                >
                                    <div>{field.label}:</div>
                                    <select
                                        name={field.name}
                                        id=""
                                        required={field.required}
                                        onChange={(v) => optionChange(v)}
                                    >
                                        <option value="no select">----</option>
                                        {field.options?.map((option, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            );
                        case "textfield":
                            return (
                                <div
                                    key={`${field.name}-${index}`}
                                    className="w-full p-4 flex"
                                >
                                    <div>{field.label}:</div>
                                    <textarea
                                        className="border ml-2"
                                        required={field.required}
                                        name={field.name}
                                        cols={30}
                                        rows={5}
                                        onChange={(e) => {
                                            const updated = { ...form };
                                            updated.description =
                                                e.target.value;
                                            setForm(updated);
                                        }}
                                    ></textarea>
                                </div>
                            );
                        case "number":
                            return (
                                <div
                                    key={`${field.name}-${index}`}
                                    className="w-full p-4 flex items-center"
                                >
                                    <label className="block text-gray-700 font-semibold ">
                                        {field.label}:
                                    </label>
                                    <input
                                        className="border-b ml-2"
                                        type="number"
                                        name={field.name}
                                        step={1}
                                        onChange={(e) => {
                                            const updated = { ...form };
                                            // @ts-ignore
                                            updated[field.name] = parseInt(
                                                e.target.value
                                            );
                                            setForm(updated);
                                        }}
                                    />
                                </div>
                            );
                            break;
                        case "radio":
                            break;
                        case "abilities":
                            return (
                                <AbilitiesField
                                    key={`${field.name}-${index}`}
                                    onChange={(v) => {
                                        const updated = { ...form };
                                        // @ts-ignore
                                        updated[field.name] = v;
                                        setForm(updated);
                                    }}
                                />
                            );
                        case "keywords":
                            return (
                                <KeywordField
                                    key={`${field.name}-${index}`}
                                    onChange={(v) => {
                                        const updated = { ...form };
                                        // @ts-ignore
                                        updated[field.name] = v;
                                        setForm(updated);
                                    }}
                                />
                            );
                        case "multiTagInput":
                            return (
                                <MultiTagInput
                                    key={`${field.name}-${index}`}
                                    initialTags={[]}
                                    title={field.label}
                                    onChange={(tags) => {
                                        console.log("tags", tags);
                                    }}
                                />
                            );
                        case "payCost":
                            return (
                                <PayCostInput
                                    value={(form as UnitCard).cost}
                                    key={`${field.name}-${index}`}
                                    onChange={(v) => {
                                        const updated = { ...form };
                                        // @ts-ignore
                                        updated[field.name] = v;
                                        setForm(updated);
                                    }}
                                />
                            );
                        default:
                            break;
                    }
                })}
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
}
