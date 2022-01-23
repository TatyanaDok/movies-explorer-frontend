import React from "react";
import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <div className="portfolio__links">
        <a
          className="portfolio__link"
          href="https://github.com/TatyanaDok/how-to-learn"
        >
          Статичный сайт
        </a>
        <a
          className="portfolio__link"
          href="https://github.com/TatyanaDok/russian-travel"
        >
          Адаптивный сайт
        </a>
        <a
          className="portfolio__link"
          href="https://github.com/TatyanaDok/react-mesto-auth"
        >
          Одностраничное приложение
        </a>
      </div>
    </section>
  );
}
export default Portfolio;
