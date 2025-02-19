import logo from "../../images/logo.png"
import "./Footer.scss"

export const Footer = () => {
    return (
        <footer className='footer'>
          <div className='footer_content'>
            <img src={logo} alt='Company Logo' className='footer_logo' />
            <nav className='footer_links'>
              <a href='/'>Головна</a>
              <a href='/catalog'>Каталог</a>
              <a href='/about'>Про нас</a>
              <a href='/contact'>Контакти</a>
              <a href='/delivery'>Доставка і оплата</a>
            </nav>
            <p className='footer_copyright'>&copy; {new Date().getFullYear()} Всі права захищені</p>
          </div>
        </footer>
    )
}