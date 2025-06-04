const axios = require("axios");
const fs = require("fs");

const API_KEY = "677e49cffbec9eb98551149805b570da77a0eb8b";
const API_URL = "https://my.prom.ua/api/v1/products/list";
const OUTPUT_FILE = "prom_products.json";

// 🔹 Функція для видалення HTML-тегів
function stripHtml(html) {
  return html
    .replace(/<\/?[^>]+(>|$)/g, "") // Видаляє всі теги <p>, <strong> тощо
    .replace(/&nbsp;/g, " ") // Видаляє HTML-енкодовані пробіли
    .replace(/&[#0-9a-z]+;/gi, ""); // Видаляє всі HTML-енкодовані символи
}

async function fetchAllProducts() {
  let allProducts = [];
  let page = 1;
  let totalPages = 1;

  console.log("⏳ Отримання товарів з Prom.ua...");

  while (page <= totalPages) {
    try {
      console.log(`📄 Отримуємо сторінку ${page}...`);

      const response = await axios.get(`${API_URL}?limit=100&page=${page}`, {
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        }
      });

      console.log(response.data)

      if (response.data.products && response.data.products.length > 0) {
        const products = response.data.products.map(product => ({
          id: product.id,
          name: product.name,
          category: product.group?.name || "Без категорії",
          price: product.price,
          images: product.images?.length > 0 
            ? [product.main_image, ...product.images.map(img => img.url)] 
            : [product.main_image || "Немає фото"],
          description: stripHtml(product.description || ""), // 🛠 Очищення HTML
        }));

        allProducts = [...allProducts, ...products];

        totalPages = response.data.last_page || 1;
        page++;
      } else {
        console.log("❌ Немає більше товарів для отримання.");
        break;
      }

    } catch (error) {
      console.error("❌ Помилка отримання товарів:", error.response?.data || error.message);
      break;
    }
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allProducts, null, 2));
  console.log(`✅ Успішно отримано ${allProducts.length} товарів та збережено у ${OUTPUT_FILE}`);
}

fetchAllProducts();
