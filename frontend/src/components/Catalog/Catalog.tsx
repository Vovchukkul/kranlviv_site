import React, { useState } from 'react';
import './Catalog.scss';

const products = [
  { id: 1, name: 'Товар 1', category: 'Категорія A', image: './images/product1.jpg', price: '1000 грн' },
  { id: 2, name: 'Товар 2', category: 'Категорія B', image: './images/product2.jpg', price: '1500 грн' },
  { id: 3, name: 'Товар 3', category: 'Категорія A', image: './images/product3.jpg', price: '1200 грн' },
  { id: 4, name: 'Товар 4', category: 'Категорія C', image: './images/product4.jpg', price: '1800 грн' },
  { id: 5, name: 'Товар 5', category: 'Категорія D', image: './images/product5.jpg', price: '1800 грн' },
];

export const CatalogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [visibleProducts, setVisibleProducts] = useState(4);

  const handleSearch = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setCategoryFilter(event.target.value);
  };

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) =>
      categoryFilter ? product.category === categoryFilter : true
    )
    .slice(0, visibleProducts);

  return (
    <div className="catalog_page">
      <h1>Каталог товарів</h1>
      <div className="catalog_controls">
        <input
          type="text"
          placeholder="Пошук товарів..."
          value={searchTerm}
          onChange={handleSearch}
          className="search_input"
        />
        <select onChange={handleFilterChange} className="filter_dropdown">
          <option value="">Всі категорії</option>
          <option value="Категорія A">Категорія A</option>
          <option value="Категорія B">Категорія B</option>
          <option value="Категорія C">Категорія C</option>
        </select>
      </div>
      <div className="product_grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product_card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <a href='/product' className="buy_button">Купити</a>
          </div>
        ))}
      </div>
      {visibleProducts < products.length && (
        <button className="load_more" onClick={() => setVisibleProducts(visibleProducts + 4)}>
          Завантажити ще
        </button>
      )}
    </div>
  );
};
