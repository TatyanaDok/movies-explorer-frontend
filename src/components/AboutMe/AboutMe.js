import React from "react";
import Photo from "../../images/me.jpeg";
import "./AboutMe.css";

function AboutMe() {
  return (
    <section id="about-me" className="about-me">
      <h3 className="about-me__section">Студент</h3>
      <div className="about-me__container-info">
        <div className="about-me__info">
          <h2 className="about-me__name">Татьяна</h2>
          <h4 className="about-me__profession">
            Фронтенд-разработчик, 32 года
          </h4>
          <p className="about-me__text">
            Родилась и живу в городе Пятигорск. Закончила институт по
            специальности менеджмент. Занималась изучением верстки
            самостоятельно,очень увлеклась и решила сменить род деятельности.{" "}
          </p>
          <div className="about-me__links">
            <a className="about-me__link" href="https://www.facebook.com/">
              Facebook
            </a>
            <a className="about-me__link" href="https://github.com/TatyanaDok">
              Github
            </a>
          </div>
        </div>
        <img src={Photo} alt="фото" className="about-me__photo" />
      </div>
    </section>
  );
}
export default AboutMe;
