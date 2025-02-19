
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ProductPage.scss';

const productImages = [
  './images/logo.png',
  './images/logo.png',
  './images/logo.png'
];

const relatedProducts = [
  { id: 1, name: 'Схожий товар 1', image: './images/related1.jpg', price: '1200 грн' },
  { id: 2, name: 'Схожий товар 2', image: './images/related2.jpg', price: '1500 грн' },
  { id: 3, name: 'Схожий товар 3', image: './images/related3.jpg', price: '1800 грн' }
];

export const ProductPage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
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
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className='product_page'>
      <div className='product_slider'>
        <Slider {...settings}>
          {productImages.map((image, index) => (
            <div key={index} className='product_image'>
              <img src={image} alt={`Product ${index + 1}`} />
            </div>
          ))}
        </Slider>
      </div>
      
      <div className='product_info'>
        <h1 className='product_title'>Назва товару</h1>
        <p className='product_description'>Це детальний опис товару, що включає основні характеристики та переваги.</p>
        <ul className='product_specs'>
          <li>Характеристика 1</li>
          <li>Характеристика 2</li>
          <li>Характеристика 3</li>
        </ul>
        <button className='buy_button'>Купити</button>
      </div>
      
      <section className='related_products'>
        <h2>Схожі товари</h2>
        <Slider {...relatedSettings}>
          {relatedProducts.map(product => (
            <div key={product.id} className='related_item'>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.price}</p>
              <button className='buy_button'>Купити</button>
            </div>
          ))}
        </Slider>
      </section>
    </div>
  );
};