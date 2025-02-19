import "./Hero.scss"

export const Hero = () => {
    return (
        <section className="hero">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h1>Надійність і Потужність</h1>
            <p>Запчастини для автокранів Силач, КС3577, Івановець та інші.</p>
            <a href="/catalog" className="cta-button">Перейти в каталог</a>
          </div>
        </section>
    )
}