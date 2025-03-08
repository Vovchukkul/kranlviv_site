import { useState } from "react";
import "./Contact.scss";
import { Element } from "react-scroll";
import emailjs from "emailjs-com";

export const Contact = () => {
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    message: ""
  });

  const [isSending, setIsSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setIsSending(true);
    setSuccessMessage("");

    emailjs
      .send(
        "service_ova200g", // 🔹 Замініть на ваш ID сервісу emailjs
        "template_ph6m21j", // 🔹 Замініть на ваш ID шаблону emailjs
        {
          phone: formData.phone,
          email: formData.email,
          message: formData.message
        },
        "sA3M3ggMlrct6XaTb" // 🔹 Замініть на ваш User ID emailjs
      )
      .then(
        () => {
          setIsSending(false);
          setSuccessMessage("✅ Повідомлення успішно надіслано!");
          setFormData({ phone: "", email: "", message: "" });
        },
        (error) => {
          setIsSending(false);
          setSuccessMessage("❌ Сталася помилка! Спробуйте ще раз.");
          console.error("EmailJS Error:", error);
        }
      );
  };

  return (
    <Element name="contact">
      <section id="contact" className="contact_section">
        <div className="contact_background"></div>
        <div className="contact_content">
          <h2 className="contact_title">Зв'яжіться з нами</h2>
          <p className="contact_description">
            Заповніть форму, і ми зв'яжемося з вами якнайшвидше
          </p>

          <form className="contact_form" onSubmit={handleSubmit}>
            <input
              type="tel"
              name="phone"
              placeholder="Ваш телефон"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Ваш Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Ваше повідомлення"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit" className="contact_button" disabled={isSending}>
              {isSending ? "Надсилання..." : "Надіслати"}
            </button>

            {successMessage && <p className="success_message">{successMessage}</p>}
          </form>
        </div>
      </section>
    </Element>
  );
};
