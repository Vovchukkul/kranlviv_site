import React, { useState } from "react";
import { Product } from "../../types/Product";
import "./Catalog.scss";

type Props = {
  products: Product[],
}

export const CatalogPage: React.FC<Props> = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [visibleProducts, setVisibleProducts] = useState<number>(20);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(event.target.value);
  };

  if (products.length === 0) {
    return <h2 className="loading">Завантаження товарів...</h2>;
  }

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) => (categoryFilter ? product.category === categoryFilter : true))
    .slice(0, visibleProducts);
  
  
  
  console.log("Images:")
  console.log(products.map(p => p.images))

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
          {Array.from(new Set(products.map((product) => product.category))).map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div className="product_grid">
        {filteredProducts.map((product) => (
          <div key={product._id} className="product_card">
            <img src={product.images[0]} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price} грн</p>
            <a href={`/product/${product._id}`} className="buy_button">Переглянути</a>
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
