import React from "react";
import logo from "../../public/images/logo.svg";
import moon from "../../public/images/icon-moon.svg";

const Header = () => {
  const setFontFamily = (font) => {
    document.querySelector("body").style.fontFamily = font.target.value;
  };

  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
    localStorage.setItem("selectedTheme", "dark");
  };

  const setLightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
    localStorage.setItem("selectedTheme", "light");
  };

  const toggleTheme = (e) => {
    if (e.target.checked) setDarkMode();
    else setLightMode();
  };

  const selectedTheme = localStorage.getItem("selectedTheme");

  if (selectedTheme === "dark") {
    setDarkMode();
  }

  return (
    <form className="header" >
      <img src={logo} alt="logo" className="header__logo" />

      <select
        className="header__select"
        onChange={setFontFamily}
      >
        <option value="sans-serif">Sans Serif</option>
        <option value="serif">Serif</option>
        <option value="monospace">Mono</option>
      </select>

      <span className="header__line"></span>

      <label className="switch">
        <input
          type="checkbox"
          onChange={toggleTheme}
          defaultChecked={selectedTheme === "dark"}
        />
        <span className="slider round"></span>
      </label>

      <img src={moon} alt="moon" className="moon_icon" />
    </form>
  );
};

export default Header;
