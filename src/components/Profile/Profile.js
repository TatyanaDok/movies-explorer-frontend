import "./Profile.css";
import React, { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import InfoMessage from "../InfoMessage/InfoMessage";
import Navigation from "../Navigation/Navigation";

function Profile({ onSignOut, onUpdate, infoMessage }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, errors, isValid, handleChange, setValues, setIsValid } =
    useFormWithValidation();
  const [isInputActive, setIsInputActive] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setValues({
        name: currentUser.name,
        email: currentUser.email,
      });
    }
  }, [setValues, currentUser]);

  useEffect(() => {
    if (
      currentUser.name === values.name &&
      currentUser.email === values.email
    ) {
      setIsValid(false);
    }
  }, [setIsValid, values, currentUser]);

  useEffect(() => {
    if (infoMessage.isShown && infoMessage.code === 200) {
      setIsInputActive(false);
    }
  }, [setIsInputActive, infoMessage.isShown, infoMessage.code]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdate(values.name, values.email);
  }

  function handleRedactClick() {
    setIsInputActive(true);
  }

  return (
    <>
      <header className="header-nav">
        <NavLink to="/">
          <div className="header__logo-nav" />
        </NavLink>
        <Navigation />
      </header>
      <section className="profile">
        <div className="profile__box">
          <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
          <form className="profile__form" onSubmit={handleSubmit}>
            <label className="profile__label">
              Имя
              <input
                value={values.name || ""}
                onChange={handleChange}
                type="text"
                className="profile__input"
                name="name"
                minLength="2"
                maxLength="30"
                required
                title="Разрешено использовать латиницу, кириллицу, пробел или дефис"
                pattern="^[A-Za-zА-Яа-яЁё /s -]+$"
                id="name"
                disabled={!isInputActive}
              />
              <span id="name-error" className="profile__error">
                {errors.name
                  ? "Поле должно быть заполнено и может содержать только латиницу, кириллицу, пробел или дефис"
                  : ""}
              </span>
            </label>
            <label className="profile__label">
              Email
              <input
                value={values.email || ""}
                onChange={handleChange}
                type="email"
                className="profile__input"
                name="email"
                minLength="2"
                maxLength="30"
                required
                id="email"
                disabled={!isInputActive}
              />
              <span id="email-error" className="profile__error">
                {errors.email || ""}
              </span>
            </label>

            <InfoMessage {...infoMessage} />

            {isInputActive ? (
              <button
                className={`profile__btn profile__btn_type_submit app__link`}
                type="submit"
                disabled={!isValid}
              >
                Сохранить
              </button>
            ) : (
              <>
                <button
                  className={`profile__btn profile__btn_type_redact app__link`}
                  type="button"
                  onClick={handleRedactClick}
                >
                  Редактировать
                </button>
                <button
                  className="profile__btn profile__btn_type_logout app__link"
                  type="button"
                  onClick={onSignOut}
                >
                  Выйти из аккаунта
                </button>
              </>
            )}
          </form>
        </div>
      </section>
    </>
  );
}

export default Profile;
