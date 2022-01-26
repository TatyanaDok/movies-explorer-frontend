import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";
function NotFound() {
  return (
    <div className="not-found">
      <h1 className="not-found__numbers">404</h1>
      <p className="not-found__info">Страница не найдена</p>
      <Link className="not-found__back" to="/">
        Назад
      </Link>
    </div>
  );
}

export default NotFound;
