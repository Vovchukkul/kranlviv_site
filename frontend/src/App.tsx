import { useState } from 'react';
import './App.css';

import { ProductSlider } from './components/ProductSlider/ProductSlider';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';
import { About } from './components/About/About';
import { Hero } from './components/Hero/Hero';

const products = [
    { id: 1, name: 'Запчастина 1', image: './images/product1.jpg', price: '1000 грн' },
    { id: 2, name: 'Запчастина 2', image: './images/product2.jpg', price: '1500 грн' },
    { id: 3, name: 'Запчастина 3', image: './images/product3.jpg', price: '1200 грн' },
    { id: 4, name: 'Запчастина 4', image: './images/product4.jpg', price: '1800 грн' }
  ];

function App() {
    return (
      <div className='app'>
        <Hero />
        
        <section className="product-slider-section">
          <h2 className="section-title">Популярні товари</h2>
          <ProductSlider products={products} />
        </section>

        <About />

        <Contact />
      </div>
    );
  }
  
export default App;
  