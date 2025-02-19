import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import { ProductPage } from './components/ProductPage/ProductPage';

export const Root = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/product" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  );
};