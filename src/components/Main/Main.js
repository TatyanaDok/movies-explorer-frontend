import React from "react";
import { Link } from "react-router-dom";
import "./Main.css";
import Header from "../Header/Header";
import Promo from "../Promo/Promo";
import NavTab from "../NavTab/NavTab";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
import Preloader from "../Preloader/Preloader";
import Footer from "../Footer/Footer";
function Main({ isLoading }) {
  return isLoading ? (
    <Preloader />
  ) : (
    <>
      <Header className="header">
        <div className="header__logo" />
        <div className="header__auth">
          <Link to="/sign-up" className="header__register">
            Регистрация
          </Link>
          <Link to="/sign-in">
            <button className="header__button-entry">Войти</button>
          </Link>
        </div>
      </Header>
      <Promo />
      <NavTab />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
      <Footer />
    </>
  );
}

export default Main;
