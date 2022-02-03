import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./Profile.css";
import Navigation from "../Navigation/Navigation";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import InfoMessage from "../InfoMessage/InfoMessage";
function Profile({ onSignOut, onUpdate, infoMessage }) {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, errors, isValid, handleChange, setValues, setIsValid } =
    useFormWithValidation();
  const [isInputActive, setIsInputActive] = React.useState(false);

  // ---ЭФФЕКТЫ---
  // получаем текущие значения для установки в поля формы
  React.useEffect(() => {
    if (currentUser) {
      setValues({
        name: currentUser.name,
        email: currentUser.email,
      });
    }
  }, [setValues, currentUser]);

  // блокируем отправку формы если значения в полях и контексте одинаковые
  React.useEffect(() => {
    if (
      currentUser.name === values.name &&
      currentUser.email === values.email
    ) {
      setIsValid(false);
    }
  }, [setIsValid, values, currentUser]);

  // блокируем поля если редактирование прошло успешно
  React.useEffect(() => {
    if (infoMessage.isShown && infoMessage.code === 200) {
      setIsInputActive(false);
    }
  }, [setIsInputActive, infoMessage.isShown, infoMessage.code]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdate(values.name, values.email);
  }

  // обработчик для разблокирования полей ввода
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
        <form className="profile__form" onSubmit={handleSubmit}>
          <p className="profile__title">{`Привет, ${currentUser.name}!`}</p>
          <div className="profile__container">
            <div className="profile__input-box">
              <label className="profile__input-name" htmlFor="name">
                Имя
              </label>
              <input
                required
                className="profile__input"
                type="text"
                minLength={2}
                maxLength={30}
                pattern="^[а-яА-ЯЁё\s\-]+$"
                id="name"
                name="name"
                value={values.name || ""}
                onChange={handleChange}
                title="Разрешено использовать латиницу, кириллицу, пробел или дефис"
                disabled={!isInputActive}
              ></input>
            </div>
            <span className="form__error">
              {errors.name
                ? "Поле должно быть заполнено и может содержать только латиницу, кириллицу, пробел или дефис"
                : ""}
            </span>
            <div className="profile__input-box">
              <label className="profile__input-name" htmlFor="email">
                E-mail
              </label>
              <input
                required
                name="email"
                value={values.email || ""}
                onChange={handleChange}
                className="profile__input"
                type="email"
                id="email"
                disabled={!isInputActive}
                pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              ></input>
            </div>
            <span className="form__error">{errors.email || ""}</span>
            <InfoMessage {...infoMessage} />
            <div className="profile__buttons">
              <button
                className="profile__button-edit"
                type="submit"
                onClick={handleRedactClick}
              >
                Редактировать
              </button>

              <button
                className="profile__button-exit"
                type="button"
                onClick={onSignOut}
              >
                Выйти из аккаунта
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
export default Profile;
