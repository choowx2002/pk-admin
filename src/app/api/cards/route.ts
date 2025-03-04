import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/mongo"; // 确保路径正确

export async function GET(req: NextRequest) {
    try {
        const db = await connectToDatabase();
        const cards = await db.collection("cards").find({}).toArray();
        return NextResponse.json(cards, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
