import React from "react";
import { Route, Link } from "react-router-dom";
import logo from "../../images/logoBlack.jpg";
import "../Form/Form.css";
function Register({ textButton, formTitle, formQuestion }) {
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <Route>
      <div className="form">
        <div className="form__container">
          <Link to="/">
            <img className="form__logo" src={logo} alt="Логотип" />
          </Link>
          <h2 className="form__title">{formTitle}</h2>
          <form className="form__data" onSubmit={handleSubmit}>
            <p className="form__name">Имя</p>
            <input
              required
              id="name"
              name="name"
              type="text"
              className="form__input"
            ></input>
            <p className="form__name">E-mail</p>
            <input
              required
              id="email"
              name="email"
              type="email"
              className="form__input"
            ></input>
            <p className="form__name">Пароль</p>
            <input
              required
              id="password"
              name="password"
              type="password"
              className="form__input form__input-password"
            ></input>
            <p className="form__error">Что-то пошло не так...</p>
            <button type="submit" className="submit__button">
              {textButton}
            </button>
          </form>
          <p className="form__question">
            {formQuestion}
            <Link to="/sign-in" className="form__link">
              {" "}
              Войти
            </Link>
          </p>
        </div>
      </div>
    </Route>
  );
}

export default Register;
