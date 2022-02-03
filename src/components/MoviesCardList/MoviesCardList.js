import React from "react";
import { Route } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
function MoviesCardList() {
  return (
    <>
      <section className="films">
        <MoviesCard />
      </section>
      <div className="more">
        <Route exact path="/movies">
          <button className="movies-list__button">Ещё</button>
        </Route>
      </div>
    </>
  );
}

export default MoviesCardList;
