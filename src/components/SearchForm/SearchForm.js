import "./SearchForm.css";
import React from "react";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function SearchForm({
  onSearchClick,
  savedMoviesPage,
  shortFilms,
  onCheckbox,
}) {
  const { values, errors, isValid, setValues, handleChange, setIsValid } =
    useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onSearchClick(values.query);
  }

  React.useEffect(() => {
    if (!savedMoviesPage) {
      const input = localStorage.getItem("searchQuery");
      if (input) {
        setValues({ query: input });
        setIsValid(true);
      }
    }
  }, [savedMoviesPage, setValues, setIsValid]);

  return (
    <div className="search">
      <form className="search__movie" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Фильм"
          className="search__item"
          name="query"
          value={values.query || ""}
          onChange={handleChange}
          required
        />
        <span id="email-error" className="search-form__error">
          {errors.query ? "Нужно ввести ключевое слово" : ""}
        </span>
        <button className="search__button" type="submit" disabled={!isValid}>
          Поиск
        </button>
      </form>
      <div className="search__tumb">
        <label
          className={`search-form__filter
            ${shortFilms === "on" ? "search-form__filter_active" : null}`}
        >
          <input
            className="search-form__radio search-form__radio_off"
            type="radio"
            name="shortFilms"
            value="off"
            checked={shortFilms === "off" ? true : false}
            onChange={onCheckbox}
          />
          <input
            className="search-form__radio search-form__radio_on"
            type="radio"
            name="shortFilms"
            value="on"
            checked={shortFilms === "on" ? true : false}
            onChange={onCheckbox}
          />
          <span className="search-form__switch"></span>
        </label>
        <p className="search__text">Короткометражки</p>
      </div>
    </div>
  );
}

export default SearchForm;
