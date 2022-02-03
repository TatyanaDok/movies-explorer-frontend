import "./Login.css";
import Entrance from "../Entrance/Entrance";

function Login({ onLogin, infoMessage }) {
  //---РАЗМЕТКА JSX---
  return (
    <Entrance
      type="sign-in"
      linkTo="sign-up"
      title="Рады видеть!"
      btnName="Войти"
      subtitle="Ещё не зарегистрированы?"
      linkName="Регистрация"
      onSubmit={onLogin}
      infoMessage={infoMessage}
    />
  );
}

export default Login;
