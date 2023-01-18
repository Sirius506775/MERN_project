import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import Button from "../FormElements/Button";

import "./NavLinks.css";

const NavLinks = (props) => {
  //NavLinks 컴포넌트는 수신하는 context가 바뀔 때마다 렌더링된다.
  const auth = useContext(AuthContext); //isLoggedIn 프로퍼티를 취하는 객체

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          ALL USERS
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/u1/places">MY PLACES</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/places/new">ADD PLACE</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
      )}
        {auth.isLoggedIn && (
        <li>
          <Button onClick={auth.logout} >LOGOUT</Button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
