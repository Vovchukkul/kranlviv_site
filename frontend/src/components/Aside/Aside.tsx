import "./Aside.scss"

export const Aside = () => {
    return (
        <div className="aside container">
            <ul>
                <li>Головна</li>
                <li>Каталог</li>
                <li>Про нас</li>
                <li>Контакти</li>
                <li>Доставка і оплата</li>
            </ul>

            <a href="tel: 0980490904">зателефонувати</a>
        </div>
    )
}