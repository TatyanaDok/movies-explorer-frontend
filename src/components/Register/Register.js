import "./Register.css";
import Entrance from "../Entrance/Entrance";

function Register({ onRegister, infoMessage }) {
  // ---РАЗМЕТКА JSX---
  return (
    <Entrance
      type="sign-up"
      linkTo="sign-in"
      title="Добро пожаловать!"
      btnName="Зарегистрироваться"
      subtitle="Уже зарегестрированы?"
      linkName="Войти"
      onSubmit={onRegister}
      infoMessage={infoMessage}
    ></Entrance>
  );
}

export default Register;
