import React from "react";
import "./SearchForm.css";
function SearchForm() {
  return (
    <section className="search">
      <div className="search__movie">
        <p className="search__item">Фильмы</p>
        <button className="search__button">Поиск</button>
      </div>
      <div className="search__tumb">
        <label className="search__tumb-btn tumb-on"></label>
        <p className="search__text">Короткометражки</p>
      </div>
    </section>
  );
}

export default SearchForm;
