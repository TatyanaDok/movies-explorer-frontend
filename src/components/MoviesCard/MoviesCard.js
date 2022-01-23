import React from "react";
import film from "../../images/testImage.jpg";
import "./MoviesCard.css";
function MoviesCard() {
  return (
    <div className="film">
      <div className="film__info">
        <h3 className="film__name">В погоне за Бенкси</h3>
        <div className="film__time">27 минут</div>
      </div>
      <img src={film} alt="Кадр из фильма" className="film__image" />
      <button className="film__btn-save film__btn-saved film__btn-del">
        Сохранить
      </button>
    </div>
  );
}

export default MoviesCard;
