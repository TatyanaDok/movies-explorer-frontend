import "./Register.css";
import Entrance from "../Entrance/Entrance";

function Register({ onRegister, infoMessage, ...isFormDisabled }) {
  return (
    <Entrance
      type="signup"
      linkTo="signin"
      title="Добро пожаловать!"
      btnName="Зарегистрироваться"
      subtitle="Уже зарегестрированы?"
      linkName="Войти"
      onSubmit={onRegister}
      infoMessage={infoMessage}
      isFormDisabled={isFormDisabled}
    ></Entrance>
  );
}

export default Register;
