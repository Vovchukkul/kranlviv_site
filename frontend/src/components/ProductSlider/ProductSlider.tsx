import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "./ProductSlider.scss"

type Props = {
    products: {
        id: number;
        name: string;
        image: string;
        price: string;
    }[]
}

export const ProductSlider: React.FC<Props> = ({ products }) => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false,
      centerMode: true,
      centerPadding: '0px',
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            centerMode: false,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            centerMode: false,
          }
        }
      ]
    };
  
    return (
      <div className="product-slider-container">
        <Slider {...settings}>
          {products.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.price}</p>
              <a href="/product" className="buy-button">Купити</a>
            </div>
          ))}
        </Slider>
      </div>
    );
  };
  