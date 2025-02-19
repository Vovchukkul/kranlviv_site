import "./Aside.scss"

export const Aside = () => {
    return (
        <aside className="aside container bg-gray-800 text-white p-4 fixed top-0 left-0 w-64 h-full shadow-md slide-in">
            <ul className="flex flex-col gap-4">
                <li><a href="/">Головна</a></li>
                <li><a href="/catalog">Каталог</a></li>
                <li><a href="/about">Про нас</a></li>
                <li><a href="/contact">Контакти</a></li>
                <li><a href="/delivery">Доставка і оплата</a></li>
            </ul>
            <a href="tel:0980490904" className="block mt-6 text-gray-400 hover:text-white">Зателефонувати</a>
        </aside>
    );
}