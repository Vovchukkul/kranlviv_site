import './App.css';

import { ProductSlider } from './components/ProductSlider/ProductSlider';
import { Contact } from './components/Contact/Contact';
import { About } from './components/About/About';
import { Hero } from './components/Hero/Hero';
import { Product } from './types/Product';

// const products = [
//   { id: 1, name: 'Запчастина 1', image: './images/product1.jpg', price: '1000 грн' },
//   { id: 2, name: 'Запчастина 2', image: './images/product2.jpg', price: '1500 грн' },
//   { id: 3, name: 'Запчастина 3', image: './images/product3.jpg', price: '1200 грн' },
//   { id: 4, name: 'Запчастина 4', image: './images/product4.jpg', price: '1800 грн' }
// ];

type Props = {
  products: Product[]
}

export const App: React.FC<Props> = ({ products }) => {
    return (
      <div className='app'>
        <Hero />
        
        <section className="product-slider-section">
          <ProductSlider products={products} />
        </section>

        <About />

        <Contact />
      </div>
    );
  }
  
export default App;
  