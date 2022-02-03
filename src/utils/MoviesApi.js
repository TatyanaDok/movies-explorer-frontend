class MoviesApi {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  getMovies() {
    return fetch(`${this._url}/beatfilm-movies`, {
      credentials: "same-origin",
      headers: this._headers,
    }).then(this._checkResponse);
  }
}
const moviesApi = new MoviesApi({
  url: " https://api.nomoreparties.co",
  headers: {
    "Content-Type": "application/json",
  },
});

export default moviesApi;
