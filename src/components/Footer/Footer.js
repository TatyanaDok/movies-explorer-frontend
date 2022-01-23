import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__container">
        <p className="footer__copyright">&copy; 2022</p>
        <ul className="footer__links">
          <li className="footer__link-item">
            <a href="https://practicum.yandex.ru" className="footer__link">
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer__link-item">
            <a href="https://github.com/TatyanaDok" className="footer__link">
              Github
            </a>
          </li>
          <li className="footer__link-item">
            <a href="https://www.facebook.com/" className="footer__link">
              {" "}
              Facebook
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
export default Footer;
