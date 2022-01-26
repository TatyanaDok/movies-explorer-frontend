import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import { NavLink } from "react-router-dom";
function Movies() {
  return (
    <>
      <header className="header-nav">
        <NavLink to="/">
          <div className="header__logo-nav" />
        </NavLink>
        <Navigation />
      </header>
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </>
  );
}

export default Movies;
