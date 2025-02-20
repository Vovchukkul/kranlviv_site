import "./About.scss"

import rely from "../../images/rely.webp"
import quality from "../../images/quality.webp"
import delivery from "../../images/delivery.webp"
import { Element } from "react-scroll"

export const About = () => {
    return (
        <Element name="about">
          <section id="about" className='about_us'>
            <h2 className="section-title">Про нас</h2>
            <p className="section-description">Ми пропонуємо надійні запчастини для автокранів із швидкою доставкою та гарантією якості.</p>
            
            <div className='about_grid'>
              <article className='about_item'>
                <img src={delivery} alt="Швидка доставка" className='about_icon'/>
                <p className='about_text'>Швидка доставка по всій країні</p>
              </article>

              <article className='about_item'>
                <img src={quality} alt="Якість запчастин" className='about_icon'/>
                <p className='about_text'>Тільки якісні сертифіковані запчастини</p>
              </article>

              <article className='about_item'>
                <img src={rely} alt="Надійність" className='about_icon'/>
                <p className='about_text'>Гарантія якості та довговічності</p>
              </article>
            </div>
          </section>
        </Element>
    )
}