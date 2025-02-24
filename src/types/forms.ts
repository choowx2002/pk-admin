import { CardTypes } from "./constant";

type FieldType = "text" | "number" | "select" | "radio" | "textfield" | "abilities" | "keywords" | "multiTagInput" | "payCost"

interface FieldOption {
    label: string;
    value: string;
} 

interface Field {
    label: string;
    name: string;
    type: FieldType;
    placeholder?: string;
    options?: FieldOption[];
    required?: boolean;
    min?: number;
    max?: number;
    validation?: any // TODO: add validation later
}

export const BaseCardForm: Field[] = [
    {
        label: "Card Id",
        name: "cardId",
        type: "text",
        placeholder: "例如: FND-003/298",
        required: true
    },
    {
        label: "Name",
        name: "name",
        type: "text",
        placeholder: "例如: 炼金太保",
        required: true
    },
    {
        label: "Description",
        name: "description",
        type: "textfield",
        placeholder: "卡牌的效果或能力",
        max: 500,
        required: true
    },
    {
        label: "Type",
        name: "type",
        type: "select",
        options: CardTypes.map((t) => {
            return {label: t, value: t}
        }),
        required: true
    },
]

export const RuneCardForm: Field[] = [
    {
        label: "Abilities",
        name: "abilities",
        type: "abilities",
    }
]

export const UnitCardForm: Field[] = [
    {
        label: "Abilities",
        name: "abilities",
        type: "abilities",
    },
    {
        label: "Faction",
        name: "faction",
        type: "multiTagInput",
    },
    {
        label: "Might",
        name: "might",
        type: "number",
    },
    {
        label: "Keywords",
        name: "keywords",
        type: "keywords",
    },
    {
        label: "Cost",
        name: "cost",
        type: "payCost",
    }
]