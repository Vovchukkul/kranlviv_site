import logo from "../../images/logo.png"
import "./Header.scss"
import { Link } from "react-scroll" 
import { Link as L } from "react-router-dom"

type Props = {
    click: () => void,
    isActive: boolean,
};

export const Header: React.FC<Props> = ({ click, isActive }) => {
    return (
        <header className="header container bg-gray-900 text-white flex justify-between items-center p-4 shadow-lg">
            <a href="/">
                <img className="header_logo h-12" src={logo} alt="logo" />
            </a>
            
            <nav className="hidden md:flex gap-6">
                <a href="/" className="hover:text-gray-400">Головна</a>
                <L to="catalog" className="hover:text-gray-400">Каталог</L>
                {/* <a href="/about" className="hover:text-gray-400">Про нас</a> */}
                <Link to="about" className="hover:text-gray-400" smooth={true} duration={500}>Про нас</Link>
                {/* <a href="/contact" className="hover:text-gray-400">Контакти</a> */}
                <Link to="contact" className="hover:text-gray-400" smooth={true} duration={500}>Контакти</Link>
            </nav>

            <div className="md:hidden burger-menu" onClick={click}>
                <span className={`block w-8 h-1 bg-white mb-1 transition ${isActive ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block w-8 h-1 bg-white mb-1 transition ${isActive ? 'opacity-0' : ''}`}></span>
                <span className={`block w-8 h-1 bg-white transition ${isActive ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
        </header>
    );
};