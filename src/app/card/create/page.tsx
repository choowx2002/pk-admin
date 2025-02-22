"use client"; // 让组件运行在浏览器端

import { useState } from "react";
import axios from "axios";
import { Card } from "@/types/cards";
import { BaseCardForm } from "@/types/forms";

export default function CardsPage() {
    const [form, setForm] = useState<Card>({
        name: "",
        cardId: "",
        type: "Unit",
        description: "",
    });

    // 提交表单
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("form", e.target?.name.value);
        // await axios.post("http://localhost:4000/cards", form);
        // setForm({ name: "", cardId: "", type: "Unit", description: "" });
    };

    return (
        <div>
            <h1 className="title">添加卡牌</h1>

            <form onSubmit={handleSubmit}>
                {BaseCardForm.map(function (field, index) {
                    switch (field.type) {
                        case "text":
                            return (
                                <div key={field.name} className="inputText">
                                    <div>{field.label}:</div>
                                    <input
                                        name={field.name}
                                        type="text"
                                        placeholder={field?.placeholder}
                                    />
                                </div>
                            );
                        case "select":
                            return (
                                <div key={field.name} className="inputText">
                                    <div>{field.label}:</div>
                                    <select name={field.name} id="">
                                        {field.options?.map((option) => {
                                            return (
                                                <option value={option.value}>
                                                    {option.label}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            );
                        case "textfield":
                            return (
                                <div key={field.name} className="inputText">
                                    <div>{field.label}:</div>
                                    <textarea name={field.name} cols={30} rows={5}>
                                    </textarea>
                                </div>
                            );
                        default:
                            return <div key={field.name}>{field.label}</div>;
                    }
                })}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
