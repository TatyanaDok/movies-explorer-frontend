import { BASE_URL } from "./constants";

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

  getUser() {
    return fetch(this._userUrl, {
      credentials: "include",
    }).then(this._checkResponse);
  }

  updateProfile(name, email) {
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

  getUsersMovies() {
    return fetch(this._moviesUrl, {
      headers: this._headers,
      credentials: "include",
    }).then(this._checkResponse);
  }

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
      headers: this._headers,
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

  deleteMovie(movieId) {
    return fetch(`${this._moviesUrl}/${movieId}`, {
      method: "DELETE",
      headers: this._headers,
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
      method: "POST",
      credentials: "include",
      headers: this._headers,
    }).then(this._checkResponse);
  }
}

const mainApi = new MainApi({
  baseUrl: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=utf-8",
  },
});

export default mainApi;
