import React from "react";
import { NavLink } from "react-router-dom";
import "./Menu.css";

function Menu() {
  return (
    <>
      <div className="header__movies">
        <NavLink to="/movies" className="header__films">
          Фильмы
        </NavLink>
        <NavLink to="/saved-movies" className="header__films-save">
          Сохраненные фильмы
        </NavLink>
      </div>
      <NavLink to="/profile" className="header__account">
        Аккаунт
      </NavLink>
    </>
  );
}
export default Menu;
