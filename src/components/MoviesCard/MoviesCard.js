import React, { useState } from "react";
import { Route } from "react-router-dom";
import film from "../../images/testImage.jpg";
import "./MoviesCard.css";
function MoviesCard() {
  const [isSaved, setIsSaved] = useState(false);
  function handleClick() {
    if (isSaved) {
      setIsSaved(false);
    } else {
      setIsSaved(true);
    }
  }
  return (
    <div className="film">
      <div className="film__info">
        <h3 className="film__name">В погоне за Бенкси</h3>
        <div className="film__time">27 минут</div>
      </div>
      <img src={film} alt="Кадр из фильма" className="film__image" />
      <Route exact path="/movies">
        <button
          className={`film__btn-save ${isSaved ? "film__btn-saved" : ""}`}
          onClick={handleClick}
        >
          Сохранить
        </button>
      </Route>
      <Route exact path="/saved-movies">
        <button className="film__btn-del" />
      </Route>
    </div>
  );
}

export default MoviesCard;
