import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import logo from "../../logo.png";
export default function Navbar() {
  return (
    <div className="navbar">
      <img className="logo" src={logo} alt="logo" />
      <ul className="nav-menu">
        <NavLink to="">
          <li>Home</li>
        </NavLink>
        <NavLink to="/products">
          <li>Products</li>
        </NavLink>
        <NavLink to="/login">
          <li>Login</li>
        </NavLink>
        <NavLink to="/cart">
          <li>Cart</li>
        </NavLink>
      </ul>
    </div>
  );
}
