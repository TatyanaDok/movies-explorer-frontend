import { BASE_URL } from "./constants";

// --- КЛАСС ДЛЯ ОТПРАВКИ ЗАПРОСОВ НА СЕРВЕР ПРИЛОЖЕНИЯ ---
class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._userUrl = `${this._baseUrl}/users/me`;
    this._moviesUrl = `${this._baseUrl}/movies`;
    this._headers = headers;
  }
  _checkResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  };
  //метод получения информации о пользователе с сервера
  getUser() {
    return fetch(this._userUrl, {
      credentials: "include",
    }).then(this._checkResponse);
  }

  // метод сохранения отредактированных данных пользователя на сервере
  updateUserProfile(name, email) {
    return fetch(this._userUrl, {
      method: "PATCH",
      headers: this._headers,

      credentials: "include",
      body: JSON.stringify({
        name,
        email,
      }),
    }).then(this._checkResponse);
  }

  // метод получения избранных пользователем фильмов с сервера
  getMovies() {
    return fetch(this._moviesUrl, {
      headers: this._headers,

      credentials: "include",
    }).then(this._checkResponse);
  }

  // метод добавления нового фильма в избранное (создание карточки)
  saveNewMovie({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    id,
  }) {
    return fetch(this._moviesUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: this._token,
      },
      credentials: "include",
      body: JSON.stringify({
        country: country || "no country",
        director,
        duration,
        year,
        description,
        image,
        trailer: trailerLink,
        nameRU: nameRU || "no name",
        nameEN: nameEN || "no name",
        thumbnail,
        movieId: id,
      }),
    }).then(this._checkResponse);
  }

  //метод удаления карточки пользователя с сервера
  deleteMovie(movieId) {
    return fetch(`${this._moviesUrl}/${movieId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
      credentials: "include",
    }).then(this._checkResponse);
  }

  register(name, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,

      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }).then(this._checkResponse);
  }

  login(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,

      body: JSON.stringify({
        email,
        password,
      }),
    }).then(this._checkResponse);
  }

  signout() {
    return fetch(`${this._baseUrl}/signout`, {
      method: "DELETE",
      credentials: "include",
      headers: this._headers,
    }).then(this._checkResponse);
  }
}

//создаем экземпляр класса
const mainApi = new MainApi({
  baseUrl: BASE_URL,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

export default mainApi;
