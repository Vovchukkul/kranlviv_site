import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./CartPage.scss";
import emailjs from "emailjs-com";

export const CartPage: React.FC = () => {
  const location = useLocation();
  const product = location.state?.product;
  const [quantity, setQuantity] = useState(1);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        "service_ova200g", // Замінити на свій EmailJS service ID
        "template_ph6m21j", // Замінити на свій EmailJS template ID
        orderDetails,
        "sA3M3ggMlrct6XaTb" // Замінити на свій EmailJS user ID
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
        <input type="text" name="city" placeholder="Місто" onChange={handleChange} required />
        <input type="text" name="novaPoshta" placeholder="Відділення Нової Пошти" onChange={handleChange} required />
        <button type="submit" className="buy_button">Замовити</button>
      </form>
    </div>
  );
};
