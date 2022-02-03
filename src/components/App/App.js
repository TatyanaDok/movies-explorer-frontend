import React, { useState, useEffect } from "react";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  withRouter,
} from "react-router-dom";
import Movies from "../Movies/Movies";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import SavedMovies from "../Movies/Movies";
import NotFound from "../NotFound/NotFound";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import moviesApi from "../../utils/MoviesApi";
import { SUCCESSFUL_CODE } from "../../utils/constants";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import mainApi from "../../utils/MainApi";
import Preloader from "../Preloader/Preloader";
function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isTokenChecked, setIsTokenChecked] = useState(false);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isError, setIsError] = React.useState(false);
  const [infoMessage, setInfoMessage] = React.useState({
    isShown: false,
    message: "",
    code: SUCCESSFUL_CODE,
  });

  React.useEffect(() => {
    mainApi
      .getUser()
      .then((data) => {
        setLoggedIn(true);
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      mainApi
        .getMovies()
        .then((data) => {
          setSavedMovies(data);
          setLoggedIn(true);
          setIsError(false);
        })
        .catch((err) => {
          setIsError(true);
          console.log(err);
        });
    }
  }, [loggedIn]);

  // обработчик регистрации пользователя
  function handleRegister(name, email, password) {
    mainApi
      .register(name, email, password)
      .then((data) => {
        handleLogin(data.email, password);
      })
      .catch(({ message, statusCode }) => {
        setInfoMessage({
          ...infoMessage,
          isShown: true,
          message,
          code: statusCode,
          type: "register",
        });
      });
  }

  // обработчик авторизации пользователя
  function handleLogin(email, password) {
    mainApi
      .login(email, password)
      .then((res) => {
        setLoggedIn(true);
        history.push("/movies");
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      });
  }
  // обработчик выхода пользователя
  function handleSignOut() {
    mainApi
      .signout()
      .then(() => {
        setLoggedIn(false);
        setCurrentUser({});
        localStorage.clear();
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // обработчик изменения данных пользователя
  function handleUpdateUser({ name, email }) {
    mainApi
      .updateUserProfile(name, email)
      .then((data) => {
        setCurrentUser(data);
        setInfoMessage({
          ...infoMessage,
          isShown: true,
          type: "profile",
        });
      })
      .catch(({ message, statusCode }) => {
        setInfoMessage({
          ...infoMessage,
          isShown: true,
          message,
          code: statusCode,
          type: "profile",
        });
      });
  }

  // обработчик добавления фильма в избранное
  function handleSaveMovie(movie) {
    mainApi
      .saveNewMovie(movie)
      .then((newCard) => {
        setSavedMovies([newCard, ...savedMovies]);
      })
      .catch((err) => console.log(err));
  }

  // обработчик удаления фильма из избранного
  function handleDeleteMovie(movie) {
    mainApi
      .deleteMovie(movie._id)
      .then(() => {
        const newMoviesList = savedMovies.filter((m) =>
          m._id === movie._id ? false : true
        );
        setSavedMovies(newMoviesList);
      })
      .catch((err) => console.log(err));
  }

  // обработчик сброса вывода сообщения с сервера
  function handleClickResetInfoMessage() {
    if (infoMessage.isShown) {
      setInfoMessage({
        ...infoMessage,
        isShown: false,
        message: "",
        type: "",
        code: SUCCESSFUL_CODE,
      });
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {isTokenChecked ? (
        <Preloader />
      ) : (
        <>
          <div className="root">
            <Switch>
              <ProtectedRoute
                exact
                path="/saved-movies"
                loggedIn={loggedIn}
                component={SavedMovies}
                list={savedMovies}
                onDeleteClick={handleDeleteMovie}
                isError={isError}
              />
              <ProtectedRoute
                exact
                path="/profile"
                isLoggedIn={loggedIn}
                component={Profile}
                onSignOut={handleSignOut}
                onUpdate={handleUpdateUser}
                infoMessage={infoMessage}
              />

              <Route exact path="/">
                <Main isLoggedIn={loggedIn} />
              </Route>

              <Route path="/sign-up">
                {loggedIn ? (
                  <Redirect to="/movies" />
                ) : (
                  <Register
                    onRegister={handleRegister}
                    infoMessage={infoMessage}
                  />
                )}
              </Route>

              <Route path="/sign-in">
                {loggedIn ? (
                  <Redirect to="/movies" />
                ) : (
                  <Login onLogin={handleLogin} infoMessage={infoMessage} />
                )}
              </Route>
              <ProtectedRoute
                exact
                path="/movies"
                isLoggedIn={loggedIn}
                component={Movies}
                savedMoviesList={savedMovies}
                onDeleteClick={handleDeleteMovie}
              />
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </div>
        </>
      )}
    </CurrentUserContext.Provider>
  );
}
export default withRouter(App);
