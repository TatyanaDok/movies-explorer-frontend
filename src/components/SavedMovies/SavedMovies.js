import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { filterMovies } from "../../utils/utils";
import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import { NavLink } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function SavedMovies({ list, onDeleteClick, isError }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [shortFilms, setShortFilms] = useState("off");

  const [filteredMovies, setFilteredMovies] = useState(list);

  const [isNothingFound, setIsNothingFound] = useState(false);

  function handleSearchSubmit(value) {
    setSearchQuery(value);
    const resultList = filterMovies(list, searchQuery, shortFilms);
    setFilteredMovies(resultList);
  }

  function handleShortFilms(e) {
    setShortFilms(e.target.value);
  }

  useEffect(() => {
    const arr = filterMovies(list, searchQuery, shortFilms);
    setFilteredMovies(arr);
    if (searchQuery) {
      arr.length === 0 ? setIsNothingFound(true) : setIsNothingFound(false);
    }
  }, [searchQuery, shortFilms, list]);

  return (
    <>
      <header className="header-nav">
        <NavLink to="/">
          <div className="header__logo-nav" />
        </NavLink>
        <Navigation />
      </header>
      <section className="saved-movies">
        <SearchForm
          onSearchClick={handleSearchSubmit}
          onCheckbox={handleShortFilms}
          shortFilms={shortFilms}
          savedMoviesPage={true}
        />
        <MoviesCardList
          list={filteredMovies}
          savedMoviesPage={true}
          onDelete={onDeleteClick}
          isEmptyList={isNothingFound}
          isError={isError}
        />
      </section>
      <Footer />
    </>
  );
}

export default SavedMovies;
