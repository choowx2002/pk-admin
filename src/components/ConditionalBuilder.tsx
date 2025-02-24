"use client";

import { Condition } from "@/types/abilities";
import { useState } from "react";

// 单个条件行组件
interface ConditionRowProps {
    condition: Condition;
    onChange: (newCondition: Condition) => void;
    onRemove: () => void;
}

export function ConditionRow({
    condition,
    onChange,
    onRemove,
}: ConditionRowProps) {
    // 判断是否处于“常量模式”还是“属性对比模式”
    const [compareWithAttribute, setCompareWithAttribute] = useState(
        !!condition.attribute2
    );

    return (
        <div className="condition-row">
            {/* 属性选择 */}
            <select
                value={condition.attribute}
                onChange={(e) =>
                    onChange({ ...condition, attribute: e.target.value })
                }
            >
                <option value="onPlayUnit">onPlayUnit</option>
                <option value="handSize">handSize</option>
                {/* 根据实际情况补充其他属性 */}
            </select>

            {/* 操作符选择 */}
            <select
                value={condition.operator}
                onChange={(e) =>
                    onChange({
                        ...condition,
                        operator: e.target.value as Condition["operator"],
                    })
                }
            >
                <option value=">=">&gt;=</option>
                <option value=">">&gt;</option>
                <option value="<=">&lt;=</option>
                <option value="<">&lt;</option>
                <option value="==">==</option>
                <option value="!=">!=</option>
            </select>

            {/* 切换常量与属性对比 */}
            <button
                onClick={(e) => {
                    e.preventDefault();
                    setCompareWithAttribute(!compareWithAttribute);
                }}
            >
                {compareWithAttribute ? "Attribute" : "Variable"}
            </button>

            {compareWithAttribute ? (
                // 当选择属性对比时，显示第二个属性的选择
                <select
                    value={condition.attribute2 || ""}
                    onChange={(e) =>
                        onChange({ ...condition, attribute2: e.target.value })
                    }
                >
                    <option value="">选择属性</option>
                    <option value="enemyDefense">enemyDefense</option>
                    <option value="allyStrength">allyStrength</option>
                    {/* 根据实际情况补充其他属性 */}
                </select>
            ) : (
                // 否则，使用常量输入框
                <input
                    type="text"
                    value={condition.value as string | number}
                    onChange={(e) =>
                        onChange({
                            ...condition,
                            value: isNaN(Number(e.target.value))
                                ? e.target.value
                                : Number(e.target.value),
                        })
                    }
                />
            )}

            {/* 删除条件按钮 */}
            <button onClick={onRemove}>删除</button>
        </div>
    );
}

// 条件构建器主组件
interface ConditionBuilderProps {
    value: Condition[];
    onConditionsChange: (newConditions: Condition[]) => void;
}

export default function ConditionBuilder({
    value,
    onConditionsChange,
}: ConditionBuilderProps) {
    const [conditions, setConditions] = useState<Condition[]>(value);

    const addCondition = (e: React.FormEvent) => {
        e.preventDefault();
        // 添加一条初始空白条件，可按需设置默认值
        const newValue: Condition = {
            attribute: "onPlayUnit",
            operator: ">=",
            value: 0,
        };
        const updated = [...conditions, newValue];
        setConditions(updated);
        onConditionsChange(updated);
    };

    return (
        <div className="condition-builder">
            <h3>条件构建器</h3>
            {conditions.map((cond, index) => (
                <ConditionRow
                    key={index}
                    condition={cond}
                    onChange={(newCond) => {
                        const newConditions = [...conditions];
                        newConditions[index] = newCond;
                        setConditions(newConditions);
                        onConditionsChange(newConditions);
                    }}
                    onRemove={() =>
                        onConditionsChange(
                            conditions.filter((_, i) => i !== index)
                        )
                    }
                />
            ))}
            <button onClick={addCondition}>Add Condition</button>
        </div>
    );
}
