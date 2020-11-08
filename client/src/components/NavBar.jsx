import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export const NavBar = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();

  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
    history.push("/");
  };

  return (
    <nav>
      <div class="nav-wrapper">
        <span class="brand-logo">Сокращение ссылок</span>

        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li>
            <NavLink to="/create">Создать</NavLink>
          </li>
          <li>
            <NavLink to="/links">Ссылки</NavLink>
          </li>
          <li>
            <a onClick={logoutHandler} href="/">
              Выйти
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
