import "./NotFound.css";
import { Link, useHistory } from "react-router-dom";

function NotFound() {
  const history = useHistory();

  function handleClick() {
    history.goBack();
  }

  return (
    <section className="notfound">
      <div className="notfound__desc">
        <h2 className="notfound__title">404</h2>
        <p className="notfound__subtitle">Страница не найдена</p>
      </div>
      <Link onClick={handleClick} className="notfound__link app__link">
        Назад
      </Link>
    </section>
  );
}

export default NotFound;
