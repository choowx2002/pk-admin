"use client"; // 让组件运行在浏览器端

import { useState, useEffect } from "react";
import axios from "axios";

export default function CardsPage() {
    const [cards, setCards] = useState<any>([]);
    const [form, setForm] = useState({ name: "", type: "Unit", cost: 0 });

    // 获取卡牌列表
    useEffect(() => {
        console.log("✅ API 请求触发");
        axios.get("http://localhost:4000/cards").then((res) => {
            if(res.data.success){
                setCards(res.data.res);
            }
        });
    }, []);

    // 提交表单
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await axios.post("http://localhost:4000/cards", form);
        setForm({ name: "", type: "Unit", cost: 0 });
    };

    return (
        <div className="p-4 bg-slate-600 shadow rounded-lg">
            <h1 className="text-2xl font-bold mb-4">卡牌管理</h1>

            <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
                <input
                    type="text"
                    placeholder="卡牌名称"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="border p-2 rounded"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    添加卡牌
                </button>
            </form>

            <ul>
                {cards?.length ? (
                    cards.map((card: any) => (
                        <li key={card.cardId} className="border-b p-2">
                            {card.name} - {card.type}
                        </li>
                    ))
                ) : (
                    <li className="text-gray-500 italic">暂无卡牌</li>
                )}
            </ul>
        </div>
    );
}
