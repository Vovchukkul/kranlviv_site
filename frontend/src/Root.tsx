import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import { ProductPage } from './components/ProductPage/ProductPage';
import { CatalogPage } from './components/Catalog/Catalog';
import { Header } from './components/Header/Header';
import { useState } from 'react';
import { Aside } from './components/Aside/Aside';
import { Footer } from './components/Footer/Footer';

export const Root = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleBurger = () => {
    setIsActive(!isActive);
  };

  return (
    <BrowserRouter>
      <Header click={toggleBurger} isActive={isActive} />
      {isActive && <Aside />}
  
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/product" element={<ProductPage />} />                                             
        <Route path="/catalog" element={<CatalogPage />} />
      </Routes>
      
      <Footer />                                                                                        
    </BrowserRouter>
  );
};
