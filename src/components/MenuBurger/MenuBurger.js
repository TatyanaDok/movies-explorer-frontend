import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./MenuBurger.css";
import icon from "../../images/icon.svg";

function MenuBurger() {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }

  function closePopup() {
    setIsOpen(false);
  }

  return (
    <nav className="nav__burger">
      <button className="burger" onClick={handleClick}></button>
      <div
        className={`burger__container ${
          isOpen ? "burger__container_open" : ""
        }`}
      >
        <div className={`burger__popup ${isOpen ? "burger__popup_open" : ""}`}>
          <button className="burger__cross" onClick={closePopup}></button>
          <div className="burger__box">
            <NavLink
              to="/"
              activeClassName="burger__link_active"
              className="burger__link"
              onClick={closePopup}
            >
              Главная
            </NavLink>
            <NavLink
              to="/movies"
              activeClassName="burger__link_active"
              className="burger__link"
              onClick={closePopup}
            >
              Фильмы
            </NavLink>
            <NavLink
              to="/saved-movies"
              activeClassName="burger__link_active"
              className="burger__link"
              onClick={closePopup}
            >
              Сохранённые фильмы
            </NavLink>
          </div>
          <div className="burger__account">
            <NavLink to="/profile" className="header__account">
              <p className="accaunt">Аккаунт</p>
              <img alt="иконка" src={icon} className="account__icon" />
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default MenuBurger;
