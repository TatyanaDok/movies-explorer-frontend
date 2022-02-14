import "./Login.css";
import Entrance from "../Entrance/Entrance";

function Login({ onLogin, infoMessage, ...isFormDisabled }) {
  return (
    <Entrance
      type="signin"
      linkTo="signup"
      title="Рады видеть!"
      btnName="Войти"
      subtitle="Ещё не зарегистрированы?"
      linkName="Регистрация"
      onSubmit={onLogin}
      infoMessage={infoMessage}
      isFormDisabled={isFormDisabled}
    />
  );
}

export default Login;
