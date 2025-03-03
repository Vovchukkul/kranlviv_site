import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import { ProductPage } from './components/ProductPage/ProductPage';
import { CatalogPage } from './components/Catalog/Catalog';
import { Header } from './components/Header/Header';
import { useEffect, useState } from 'react';
import { Aside } from './components/Aside/Aside';
import { Footer } from './components/Footer/Footer';
import { Product } from './types/Product';
import axios from 'axios';
import { CallButton } from './components/CallButton.tsx/CallButton';
import { CartPage } from './components/CartPage/CartPage';
// export const API_URL = "http://localhost:5000/api";
export const API_URL = "https://kranlviv_site.railway.internal/api";


export const Root = () => {
  const [isActive, setIsActive] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get(`${API_URL}/products`)
      .then(response => setProducts(response.data))
      .catch(error => console.error("Помилка отримання товарів:", error));
  }, []);

  const toggleBurger = () => {
    setIsActive(!isActive);
  };

  return (
    <BrowserRouter>
      <Header click={toggleBurger} isActive={isActive} />
      {isActive && <Aside />}
  
      <Routes>
        <Route path="/" element={<App products={products} />} />
        <Route path="/product/:id" element={<ProductPage products={products} />} />                                             
        <Route path="/catalog" element={<CatalogPage products={products} />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
      
      <Footer />            
      <CallButton />                                                                            
    </BrowserRouter>
  );
};
