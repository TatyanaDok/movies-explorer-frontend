import React from "react";
import { Route, Switch } from "react-router-dom";
import Movies from "../Movies/Movies";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import SavedMovies from "../Movies/Movies";
import NotFound from "../NotFound/NotFound";

function App() {
  return (
    <div className="root">
      <Switch>
        <Route exact path="/movies">
          <Movies />
        </Route>
        <Route exact path="/saved-movies">
          <SavedMovies />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/sign-up">
          <Register
            formTitle="Добро пожаловать!"
            textButton="Зарегистрироваться"
            formQuestion="Уже зарегистрированы?"
          />
        </Route>
        <Route path="/sign-in">
          <Login
            formTitle="Рады видеть!"
            textButton="Войти"
            formQuestion="Ещё не зарегистрированы?"
          />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}
export default App;
