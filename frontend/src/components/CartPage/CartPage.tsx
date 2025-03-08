import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./CartPage.scss";
import emailjs from "emailjs-com";
import Select from "react-select";
import axios from "axios";

const NOVA_POSHTA_API_KEY = "9d96f6c88387dfafd389fcf760375532"; // 🔹 Підстав сюди свій API ключ Нової Пошти

export const CartPage: React.FC = () => {
  const location = useLocation();
  const product = location.state?.product;
  const [quantity, setQuantity] = useState(1);
  const [cities, setCities] = useState<{ label: string; value: string }[]>([]);
  const [warehouses, setWarehouses] = useState<{ label: string; value: string }[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    novaPoshta: "",
  });

  if (!product) {
    return <h2>Кошик порожній 😕</h2>;
  }

  // 🏙 Отримання списку міст Нової Пошти
  useEffect(() => {
    axios
      .post("https://api.novaposhta.ua/v2.0/json/", {
        apiKey: NOVA_POSHTA_API_KEY,
        modelName: "Address",
        calledMethod: "getCities",
        methodProperties: {},
      })
      .then((response) => {
        if (response.data.success) {
          const cityOptions = response.data.data.map((city: any) => ({
            label: city.Description,
            value: city.Ref,
          }));
          setCities(cityOptions);
        } else {
          console.error("❌ Помилка отримання міст:", response.data.errors);
        }
      })
      .catch((error) => console.error("❌ Помилка API міст:", error));
  }, []);

  // 📦 Отримання відділень після вибору міста
  useEffect(() => {
    if (selectedCity) {
      axios
        .post("https://api.novaposhta.ua/v2.0/json/", {
          apiKey: NOVA_POSHTA_API_KEY,
          modelName: "AddressGeneral",
          calledMethod: "getWarehouses",
          methodProperties: { CityRef: selectedCity },
        })
        .then((response) => {
          if (response.data.success) {
            const warehouseOptions = response.data.data.map((wh: any) => ({
              label: wh.Description,
              value: wh.Ref,
            }));
            setWarehouses(warehouseOptions);
          } else {
            console.error("❌ Помилка отримання відділень:", response.data.errors);
          }
        })
        .catch((error) => console.error("❌ Помилка API відділень:", error));
    }
  }, [selectedCity]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCityChange = (selectedOption: any) => {
    setSelectedCity(selectedOption.value);
    setFormData({ ...formData, city: selectedOption.label });
    setWarehouses([]); // Очистка списку відділень при зміні міста
  };

  const handleWarehouseChange = (selectedOption: any) => {
    setFormData({ ...formData, novaPoshta: selectedOption.label });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const orderDetails = {
      ...formData,
      productName: product.name,
      price: product.price * quantity,
      quantity,
    };

    emailjs
      .send(
        "service_ova200g", // 🔹 EmailJS service ID
        "template_ph6m21j", // 🔹 EmailJS template ID
        orderDetails,
        "sA3M3ggMlrct6XaTb" // 🔹 EmailJS user ID
      )
      .then(() => alert("✅ Замовлення відправлено!"))
      .catch(() => alert("❌ Помилка при відправці!"));
  };

  return (
    <div className="cart_page">
      <h1>Ваше замовлення</h1>
      <div className="cart_item">
        <img src={product.images[0]} alt={product.name} />
        <div>
          <h2>{product.name}</h2>
          <p>{product.price} грн</p>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          <h3>Сума: {product.price * quantity} грн</h3>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="order_form">
        <input type="text" name="name" placeholder="Прізвище та ім'я" onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Телефон" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email (необов’язково)" onChange={handleChange} />

        {/* Вибір міста */}
        <Select
          options={cities}
          placeholder="Оберіть місто"
          onChange={handleCityChange}
          isSearchable
          required
        />

        {/* Вибір відділення (залежить від вибраного міста) */}
        <Select
          options={warehouses}
          placeholder="Оберіть відділення Нової Пошти"
          onChange={handleWarehouseChange}
          isSearchable
          isDisabled={!selectedCity}
          required
        />

        <button type="submit" className="buy_button">Замовити</button>
      </form>
    </div>
  );
};
