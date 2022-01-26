import React from "react";
import { Route, Link } from "react-router-dom";
import logo from "../../images/logoblack.svg";

function Login({ textButton, formTitle, formQuestion }) {
  return (
    <Route>
      <div className="form">
        <div className="form__container">
          <Link to="/">
            <img className="form__logo" src={logo} alt="Логотип" />
          </Link>
          <h2 className="form__title">{formTitle}</h2>
          <form className="form__data">
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
            <p className="form__error"></p>
            <Link to="/movies" type="submit" className="submit__button-login">
              {textButton}
            </Link>
            <p className="form__question">
              {formQuestion}
              <Link to="/sign-up" className="form__link">
                {" "}
                Регистрация
              </Link>
            </p>
          </form>
        </div>
      </div>
    </Route>
  );
}

export default Login;
