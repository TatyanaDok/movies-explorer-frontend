import React from "react";
import "./MoviesCard.css";
import { getTimeFromMin } from "../../utils/utils";
import { Route } from "react-router-dom";

function MoviesCard({ card, onSave, onDelete, saved, savedPage }) {
  function handleSaveClick() {
    onSave(card);
  }

  function handleDeleteClick() {
    onDelete(card);
  }

  return (
    <div className="film">
      <div className="film__info">
        <h3 className="film__name">{card.nameRU}</h3>
        <div className="film__time">{getTimeFromMin(card.duration)}</div>
      </div>
      <a
        className="movie__link"
        href={card.trailer || card.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={`${card.image}`}
          alt="Кадр из фильма"
          className="film__image"
        />
      </a>
      <Route exact path="/movies">
        <button
          className={`film__btn  ${saved ? "film__btn-saved" : ""}`}
          onClick={savedPage || saved ? handleDeleteClick : handleSaveClick}
        >
          Сохранить
        </button>
      </Route>
      <Route exact path="/saved-movies">
        <button
          className="film__btn-del"
          onClick={savedPage || saved ? handleDeleteClick : handleSaveClick}
        />
      </Route>
    </div>
  );
}

export default MoviesCard;
