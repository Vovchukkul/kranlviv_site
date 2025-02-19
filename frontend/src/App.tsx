import { useState } from 'react';
import './App.css';
import { Header } from './components/Header/Header';
import { Aside } from './components/Aside/Aside';
import { ProductSlider } from './components/ProductSlider/ProductSlider';

const products = [
    { id: 1, name: 'Запчастина 1', image: './images/product1.jpg', price: '1000 грн' },
    { id: 2, name: 'Запчастина 2', image: './images/product2.jpg', price: '1500 грн' },
    { id: 3, name: 'Запчастина 3', image: './images/product3.jpg', price: '1200 грн' },
    { id: 4, name: 'Запчастина 4', image: './images/product4.jpg', price: '1800 грн' }
  ];

function App() {
    const [isActive, setIsActive] = useState(false);
  
    const toggleBurger = () => {
        setIsActive(!isActive);
    };
  
    return (
      <div className='app'>
        <Header click={toggleBurger} isActive={isActive} />
        {isActive && <Aside />}
        
        <section className="hero">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h1>Надійність і Потужність</h1>
            <p>Запчастини для автокранів Силач, КС3577, Івановець та інші.</p>
            <a href="/catalog" className="cta-button">Перейти в каталог</a>
          </div>
        </section>
        
        <section className="product-slider-section">
          <h2 className="section-title">Популярні товари</h2>
          <ProductSlider products={products} />
        </section>
      </div>
    );
  }
  
export default App;
  