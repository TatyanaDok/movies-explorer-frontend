import { BASE_URL } from "./constants";

class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._userUrl = `${this._baseUrl}/users/me`;
    this._moviesUrl = `${this._baseUrl}/movies`;
    this._token = headers["authorization"];
  }
  getInitialData() {
    return Promise.all([this.getUser(), this.getUsersMovies()]);
  }
  getUser() {
    return fetch(this._userUrl, {
      headers: {
        authorization: this._token,
      },
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  updateUserProfile(name, email) {
    return fetch(this._userUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: this._token,
      },
      credentials: "include",
      body: JSON.stringify({
        name,
        email,
      }),
    }).then((res) => {
      return res.ok
        ? res.json()
        : res.json().then((err) => Promise.reject(err));
    });
  }

  getUsersMovies() {
    return fetch(this._moviesUrl, {
      headers: {
        authorization: this._token,
      },
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
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
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  deleteMovie(movieId) {
    return fetch(`${this._moviesUrl}/${movieId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  register(name, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }).then((res) => {
      return res.ok
        ? res.json()
        : res.json().then((err) => Promise.reject(err));
    });
  }

  login(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => {
      return res.ok
        ? res.json()
        : res.json().then((err) => Promise.reject(err));
    });
  }

  signout() {
    return fetch(`${this._baseUrl}/signout`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: this._token,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json;
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}

const mainApi = new MainApi({
  baseUrl: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default mainApi;
