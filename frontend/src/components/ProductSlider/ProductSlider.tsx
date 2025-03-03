import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProductSlider.scss";
import { Product } from "../../types/Product";

type Props = {
  products: Product[];
};

export const ProductSlider: React.FC<Props> = ({ products }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // ❗ Спочатку показує 4 товари
    slidesToScroll: 1,
    arrows: false,
    centerMode: false,
    // @ts-ignore
    customPaging: (i: any) => (
      <div className="custom-dot"></div> // ❗ Стилізовані крапки
    ),
    responsive: [
      {
        breakpoint: 1280, // ❗ На середніх екранах (до 1280px) — 3 товари
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024, // ❗ На малих екранах (до 1024px) — 2 товари
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768, // ❗ На мобільних екранах — 1 товар
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="product-slider-section">
      <h2 className="section-title">Популярні товари</h2>
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img src={product.images[0]} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price} грн</p>
            <a href={`/product/${product._id}`} className="buy-button">Переглянути</a>
          </div>
        ))}
      </Slider>
    </div>
  );
};
