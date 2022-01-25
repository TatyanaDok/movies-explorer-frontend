import React from "react";
import { NavLink } from "react-router-dom";
import "./Menu.css";
import icon from "../../images/icon-accaunt.svg";

function Menu() {
  return (
    <>
      <div className="header__movies">
        <NavLink
          to="/movies"
          className="header__films"
          activeClassName="menu__active"
        >
          Фильмы
        </NavLink>
        <NavLink
          to="/saved-movies"
          className="header__films-save"
          activeClassName="menu__active"
        >
          Сохраненные фильмы
        </NavLink>
      </div>
      <NavLink to="/profile" className="header__account">
        <p className="accaunt">Аккаунт</p>
        <img src={icon} alt="иконка" className="account__icon" />
      </NavLink>
    </>
  );
}
export default Menu;
