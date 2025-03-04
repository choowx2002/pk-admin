import { MongoClient } from "mongodb";

const MONGO_URI = process.env.MONGO_URI || "mongodb://admin:adminpass@localhost:27017/cardGameDB?authSource=admin";
const client = new MongoClient(MONGO_URI);
let db;

export async function connectToDatabase() {
    if (!db) {
        await client.connect();
        db = client.db("cardGameDB");
        console.log("✅ Connected to MongoDB");
    }
    return db;
}
