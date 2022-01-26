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
          target="_blank"
          rel="noreferrer"
        >
          Статичный сайт
        </a>
        <a
          className="portfolio__link"
          href="https://github.com/TatyanaDok/russian-travel"
          target="_blank"
          rel="noreferrer"
        >
          Адаптивный сайт
        </a>
        <a
          className="portfolio__link"
          href="https://github.com/TatyanaDok/react-mesto-auth"
          target="_blank"
          rel="noreferrer"
        >
          Одностраничное приложение
        </a>
      </div>
    </section>
  );
}
export default Portfolio;
