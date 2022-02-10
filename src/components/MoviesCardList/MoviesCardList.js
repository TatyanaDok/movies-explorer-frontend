import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import { getSavedMovieCard } from "../../utils/utils";
import { useWindowWidth } from "../../hooks/useWindowWidth";
import React, { useState, useEffect } from "react";

function MoviesCardList({
  isLoading,
  list,
  isEmptyList,
  isError,
  onSave,
  onDelete,
  savedMovies,
  savedMoviesPage,
}) {
  const width = useWindowWidth();
  const [showList, setShowList] = useState([]);
  const [cardsShowParams, setCardsShowParams] = useState({
    sum: 0,
    more: 0,
  });
  const [isMount, setIsMount] = useState(true);

  useEffect(() => {
    if (width > 1331) {
      setCardsShowParams({ sum: 8, more: 4 });
    } else if (width <= 1331 && width > 1027) {
      setCardsShowParams({ sum: 12, more: 3 });
    } else if (width <= 1027 && width > 629) {
      setCardsShowParams({ sum: 8, more: 2 });
    } else if (width <= 629) {
      setCardsShowParams({ sum: 5, more: 2 });
    }
    return () => setIsMount(false);
  }, [width, isMount]);

  useEffect(() => {
    if (list.length && !savedMoviesPage) {
      const res = list.filter((item, index) => index < cardsShowParams.sum);
      setShowList(res);
    }
  }, [list, savedMoviesPage, cardsShowParams.sum]);

  function handleClickMoreMovies() {
    const start = showList.length;
    const end = start + cardsShowParams.more;
    const residual = list.length - start;

    if (residual > 0) {
      const newCards = list.slice(start, end);
      setShowList([...showList, ...newCards]);
    }
  }

  function getSavedMoviesPage() {
    return list.map((item) => (
      <MoviesCard
        key={item._id}
        card={item}
        savedPage={savedMoviesPage}
        onDelete={onDelete}
      />
    ));
  }

  function getInitialMoviesPage() {
    return showList.map((item) => {
      const savedMovieCard = getSavedMovieCard(savedMovies, item.id);
      const savedMovieId = savedMovieCard ? savedMovieCard._id : null;
      return (
        <MoviesCard
          key={item.id}
          card={{ ...item, _id: savedMovieId }}
          onSave={onSave}
          onDelete={onDelete}
          saved={savedMovieCard ? true : false}
        />
      );
    });
  }

  return (
    <section className="movies-list">
      {isLoading ? (
        <Preloader />
      ) : isEmptyList || isError ? (
        <p
          className={`movies-list__message ${
            isError && "movies-list__message_type_err"
          }`}
        >
          {isError
            ? `Во время запроса произошла ошибка. 
              Возможно, проблема с соединением или сервер недоступен.
              Подождите немного и попробуйте ещё раз.`
            : "Ничего не найдено"}
        </p>
      ) : (
        <>
          <div className="movies-list__box">
            {savedMoviesPage ? getSavedMoviesPage() : getInitialMoviesPage()}
          </div>
          <button
            className={`movies-list__more-btn 
                ${
                  (savedMoviesPage ||
                    isEmptyList ||
                    showList.length === list.length) &&
                  "movies-list__more-btn_hidden"
                }`}
            type="button"
            aria-label="Показать еще"
            onClick={handleClickMoreMovies}
          >
            Ещё
          </button>
        </>
      )}
    </section>
  );
}

export default MoviesCardList;
