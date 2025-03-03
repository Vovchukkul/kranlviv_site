require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ Підключено до MongoDB"))
  .catch(err => console.error("❌ Помилка MongoDB:", err));

const Product = mongoose.model("Product", new mongoose.Schema({
  id: Number,
  name: String,
  category: String,
  price: Number,
  images: [String],
  description: String
}));

const products = JSON.parse(fs.readFileSync("prom_products.json", "utf-8"));

const importData = async () => {
  try {
    // Видаляємо старі товари перед імпортом (якщо треба)
    await Product.deleteMany();
    console.log("🗑 Видалено старі товари...");

    await Product.insertMany(products);
    console.log("✅ Товари успішно імпортовані!");

    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Помилка імпорту:", error);
    mongoose.connection.close();
  }
};

importData();
