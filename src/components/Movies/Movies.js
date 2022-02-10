import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import {
  filterMovies,
  filterShortMovies,
  changeMovies,
} from "../../utils/utils";
import * as moviesApi from "../../utils/MoviesApi";

function Movies({ onSaveClick, savedMoviesList, onDeleteClick }) {
  const forCheckbox =
    localStorage.getItem("shortFilms") === "on" ? "on" : "off";

  const [searchQuery, setSearchQuery] = useState("");
  const [shortFilms, setShortFilms] = useState(forCheckbox);

  const [filteredMovies, setFilteredMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);

  const [isNothingFound, setIsNothingFound] = useState(false);
  const [isMoviesLoaging, setIsMoviesLoaging] = useState(false);
  const [isError, setIsError] = useState(false);

  function handleSetFilteredMovies(movies, query, checkbox) {
    const moviesList = filterMovies(movies, query);
    setFilteredMovies(
      checkbox === "on" ? filterShortMovies(moviesList) : moviesList
    );
    localStorage.setItem("movies", JSON.stringify(moviesList));
  }

  function handleSearchSubmit(value) {
    setIsMoviesLoaging(true);
    setSearchQuery(value);
    localStorage.setItem("searchQuery", value);
    localStorage.setItem("shortFilms", shortFilms);

    if (!allMovies.length) {
      moviesApi
        .getMovies()
        .then((data) => {
          changeMovies(data);
          setAllMovies(data);
          handleSetFilteredMovies(data, value, shortFilms);
        })
        .catch((err) => {
          setIsError(true);
          console.log(err);
        })
        .finally(() => setIsMoviesLoaging(false));
    } else {
      handleSetFilteredMovies(allMovies, value, shortFilms);
      setIsMoviesLoaging(false);
    }
  }

  function handleShortFilms(e) {
    setShortFilms(e.target.value);
    localStorage.setItem("shortFilms", e.target.value);
  }

  function handleCheckFilteredMovies(arr) {
    arr.length === 0 ? setIsNothingFound(true) : setIsNothingFound(false);
  }

  useEffect(() => {
    const arr = JSON.parse(localStorage.getItem("movies"));
    if (arr && !searchQuery) {
      setShortFilms(localStorage.getItem("shortFilms"));
      setFilteredMovies(shortFilms === "on" ? filterShortMovies(arr) : arr);
      handleCheckFilteredMovies(arr);
    }
  }, [shortFilms, searchQuery]);

  useEffect(() => {
    if (searchQuery) {
      const arr = filterMovies(allMovies, searchQuery, shortFilms);
      setFilteredMovies(arr);
      handleCheckFilteredMovies(arr);
    }
  }, [searchQuery, shortFilms, allMovies]);

  return (
    <>
      <header className="header-nav">
        <NavLink to="/">
          <div className="header__logo-nav" />
        </NavLink>
        <Navigation />
      </header>
      <section className="movies">
        <SearchForm
          onSearchClick={handleSearchSubmit}
          onCheckbox={handleShortFilms}
          shortFilms={shortFilms}
        />
        <MoviesCardList
          isLoading={isMoviesLoaging}
          list={filteredMovies}
          isEmptyList={isNothingFound}
          isError={isError}
          onSave={onSaveClick}
          onDelete={onDeleteClick}
          savedMovies={savedMoviesList}
        />
      </section>
      <Footer />
    </>
  );
}

export default Movies;
