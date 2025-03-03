import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProductPage.scss";
import { Product } from "../../types/Product";
import { useNavigate } from "react-router-dom";

interface ProductPageProps {
  products: Product[];
}

export const ProductPage: React.FC<ProductPageProps> = ({ products }) => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p._id === id);
  const navigate = useNavigate();

  if (!product) {
    return <h2 className="not_found">Товар не знайдено</h2>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const relatedSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="product_page">
      {/* 🎥 Галерея товару */}
      <div className="product_gallery">
        <Slider {...settings}>
          {product.images.map((image, index) => (
            <div key={index} className="product_image">
              <img src={image} alt={`Product ${index + 1}`} />
            </div>
          ))}
        </Slider>
      </div>

      {/* ℹ️ Інформація про товар */}
      <div className="product_details">
        <h1 className="product_title">{product.name}</h1>
        <p className="product_description">{product.description || "Немає опису"}</p>

        {/* 📌 Характеристики */}
        <div className="product_specs">
          <h3>Основні характеристики</h3>
          <ul>
            <li><strong>Категорія:</strong> {product.category}</li>
            <li><strong>Ціна:</strong> {product.price} грн</li>
            <li><strong>Наявність:</strong>"Є в наявності"</li>
          </ul>
        </div>

        <button
          className="buy_button"
          onClick={() => navigate("/cart", { state: { product } })}
        >
          Купити
        </button>;

      </div>

      {/* 🔄 Схожі товари */}
      <section className="related_products">
        <h2>Схожі товари</h2>
        <Slider {...relatedSettings}>
          {products
            .filter((p) => p.category === product.category && p._id !== product._id)
            .slice(0, 6)
            .map((relatedProduct) => (
              <div key={relatedProduct._id} className="related_item">
                <img src={relatedProduct.images[0]} alt={relatedProduct.name} />
                <h3>{relatedProduct.name}</h3>
                <p>{relatedProduct.price} грн</p>
                <a href={`/product/${relatedProduct._id}`} className="buy_button">
                  Переглянути
                </a>
              </div>
            ))}
        </Slider>
      </section>
    </div>
  );
};
