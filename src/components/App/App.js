import "./App.css";
import React, { useEffect, useState } from "react";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import mainApi from "../../utils/MainApi";
import { SUCCESSFUL_CODE } from "../../utils/constants";

function App() {
  const history = useHistory();
  let location = useLocation();
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [infoMessage, setInfoMessage] = useState({
    isShown: false,
    message: "",
    code: SUCCESSFUL_CODE,
  });

  useEffect(() => {
    setIsLoading(true);
    mainApi
      .getInitialData()
      .then(([user, data]) => {
        setCurrentUser(user);
        setSavedMovies(data);
        setLoggedIn(true);
      })
      .catch((err) => {
        setIsError(true);
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }, [loggedIn]);

  function checkToken() {
    const path = location.pathname;
    mainApi
      .getUser()
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          setLoggedIn(false);
          setCurrentUser({});
          history.push("/");
        } else {
          setLoggedIn(true);
          history.push(path);
        }
      })
      .catch((err) => console.error(err));
  }

  React.useEffect(() => {
    checkToken();
  }, []);

  function handleRegister(name, email, password) {
    setIsFormDisabled(true);
    mainApi
      .register(name, email, password)
      .then((data) => {
        if (data) {
          console.log(data);
          handleLogin(data.email, password);
        }
      })
      .catch(({ message, statusCode }) => {
        setInfoMessage({
          ...infoMessage,
          isShown: true,
          message,
          code: statusCode,
          type: "register",
        });
      })
      .finally(() => setIsFormDisabled(false));
  }

  function handleLogin(email, password) {
    setIsFormDisabled(true);
    mainApi
      .login(email, password)
      .then((data) => {
        setLoggedIn(true);
        setCurrentUser(data);
        history.push("/movies");
      })
      .catch(({ message, statusCode }) => {
        setInfoMessage({
          ...infoMessage,
          isShown: true,
          message,
          code: statusCode,
          type: "login",
        });
      })
      .finally(() => setIsFormDisabled(false));
  }

  function handleSignOut() {
    mainApi
      .signout()
      .then((res) => {
        setLoggedIn(false);
        setCurrentUser({});
        localStorage.clear();
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(name, email) {
    mainApi
      .updateProfile(name, email)
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

  function handleSaveMovie(movie) {
    mainApi
      .saveNewMovie(movie)
      .then((newCard) => {
        setSavedMovies([newCard, ...savedMovies]);
      })
      .catch((err) => console.log(err));
  }

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
      <div
        className="root"
        onClick={infoMessage.isShown ? handleClickResetInfoMessage : null}
      >
        <>
          <Switch>
            <ProtectedRoute
              exact
              path="/movies"
              loggedIn={loggedIn}
              component={Movies}
              savedMoviesList={savedMovies}
              onSaveClick={handleSaveMovie}
              onDeleteClick={handleDeleteMovie}
            />

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
              loggedIn={loggedIn}
              component={Profile}
              onSignOut={handleSignOut}
              onUpdate={handleUpdateUser}
              infoMessage={infoMessage}
            />

            <Route exact path="/" loggedIn={loggedIn}>
              <Main isLoading={isLoading} loggedIn={loggedIn} />
            </Route>

            <Route path="/signup">
              {loggedIn ? (
                <Redirect to="/movies" />
              ) : (
                <Register
                  onRegister={handleRegister}
                  infoMessage={infoMessage}
                  isFormDisabled={isFormDisabled}
                />
              )}
            </Route>

            <Route path="/signin">
              {loggedIn ? (
                <Redirect to="/movies" />
              ) : (
                <Login
                  onLogin={handleLogin}
                  infoMessage={infoMessage}
                  isFormDisabled={isFormDisabled}
                />
              )}
            </Route>

            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
