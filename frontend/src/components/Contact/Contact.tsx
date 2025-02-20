import { useState } from "react";
import "./Contact.scss"
import { Element } from "react-scroll";

export const Contact = () => {
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    message: ''
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <Element name="contact">
      <section id="contact" className='contact_section'>
        <div className='contact_background'></div>
        <div className='contact_content'>
          <h2 className='contact_title'>Зв'яжіться з нами</h2>
          <p className='contact_description'>Заповніть форму, і ми зв'яжемося з вами якнайшвидше</p>
          <form className='contact_form' onSubmit={handleSubmit}>
            <input
              type='tel'
              name='phone'
              placeholder='Ваш телефон'
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              type='email'
              name='email'
              placeholder='Ваш Email'
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name='message'
              placeholder='Ваше повідомлення'
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type='submit' className='contact_button'>Надіслати</button>
          </form>
        </div>
      </section>
    </Element>
  );
};