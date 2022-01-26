import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Profile.css";
import Navigation from "../Navigation/Navigation";
function Profile() {
  return (
    <>
      <header className="header-nav">
        <NavLink to="/">
          <div className="header__logo-nav" />
        </NavLink>
        <Navigation />
      </header>
      <section className="profile">
        <form className="profile__form">
          <p className="profile__title">Привет,Татьяна!</p>
          <div className="profile__container">
            <div className="profile__input-box">
              <p className="profile__input-name">Имя</p>
              <input required className="profile__input" type="text"></input>
            </div>
            <div className="profile__input-box">
              <p className="profile__input-name">E-mail</p>
              <input required className="profile__input" type="email"></input>
            </div>
            <div className="profile__buttons">
              <button className="profile__button-edit" type="submit">
                Редактировать
              </button>
              <Link to="/">
                <button className="profile__button-exit" type="button">
                  Выйти из аккаунта
                </button>
              </Link>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
export default Profile;
