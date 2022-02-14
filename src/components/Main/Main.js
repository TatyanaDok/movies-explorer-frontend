import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Main.css";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
import NavTab from "../NavTab/NavTab";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Preloader from "../Preloader/Preloader";
import Navigation from "../Navigation/Navigation";

function Main({ isLoading, loggedIn }) {
  return isLoading ? (
    <Preloader />
  ) : (
    <>
      {loggedIn ? (
        <header className="header-loggedin">
          <NavLink to="/">
            <div className="header__logo" />
          </NavLink>
          <Navigation />
        </header>
      ) : (
        <Header className="header">
          <div className="header__logo" />
          <div className="header__auth">
            <Link to="/signup" className="header__register">
              Регистрация
            </Link>
            <Link to="/signin">
              <button className="header__button-entry">Войти</button>
            </Link>
          </div>
        </Header>
      )}
      <main className="content">
        <Promo />
        <NavTab />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
        <Footer />
      </main>
    </>
  );
}

export default Main;
