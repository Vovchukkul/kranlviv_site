import logo from "../../images/logo.png"
import "./Header.scss"

type Props = {
    click: () => void,
    isActive: boolean,
}

export const Header: React.FC<Props> = ({ click, isActive }) => {
    return (
        <div className="header container">
            <a href="/">    
                <img className="header_logo" src={logo} alt="logo" />
            </a>

            <ul>
                <a href="">
                    <li>Головна</li>
                </a>
                <a href="">
                    <li>Каталог</li>
                </a>
                <a href="">
                    <li>Про нас</li>
                </a>
                <a href="">
                    <li>Контакти</li>
                </a>
                <a href="">
                    <li>Доставка і оплата</li>
                </a>
            </ul>

            <div
                className={`burger-menu ${isActive ? "active" : ""}`}
                onClick={click}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    )
}