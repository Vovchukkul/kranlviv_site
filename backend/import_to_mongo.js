require("dotenv").config();
const { MongoClient } = require("mongodb");
const fs = require("fs");

const products = JSON.parse(fs.readFileSync("prom_products.json", "utf8"));

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";
const DB_NAME = "kranlviv";
const COLLECTION_NAME = "products";

async function importProducts() {
  try {
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    console.log("✅ Підключено до MongoDB");

    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    await collection.deleteMany({});
    console.log("🗑 Видалено старі товари з бази");

    const result = await collection.insertMany(products);
    console.log(`✅ Імпортовано ${result.insertedCount} товарів у колекцію '${COLLECTION_NAME}'`);

    await client.close();
  } catch (error) {
    console.error("❌ Помилка імпорту в MongoDB:", error);
  }
}

importProducts();
