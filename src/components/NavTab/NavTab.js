import React from "react";
import "./NavTab.css";
function NavTab() {
  return (
    <section className="NavTab">
      <div className="NavTab__links">
        <a href="#about-project" className="NavTab__link">
          О проекте
        </a>
        <a href="#techs" className="NavTab__link">
          Технологии
        </a>
        <a href="#about-me" className="NavTab__link">
          Студент
        </a>
      </div>
    </section>
  );
}
export default NavTab;
