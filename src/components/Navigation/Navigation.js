import React, { useState, useEffect } from "react";
import Menu from "../Menu/Menu";
import MenuBurger from "../MenuBurger/MenuBurger";

const Navigation = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const updateWindowSize = () => setWindowWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", updateWindowSize);

    return () => window.removeEventListener("resize", updateWindowSize);
  });

  return <>{windowWidth > 768 ? <Menu /> : <MenuBurger />}</>;
};
export default Navigation;
