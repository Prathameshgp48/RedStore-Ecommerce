import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../logo.png";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center py-4 px-6  bg-gradient-to-r from-white to-red-300 shadow-md">
      <img className="w-[10%] object-contain py-2 px-3" src={logo} alt="logo" />
      <ul className="flex justify-between items-center px-4">
        <NavLink to="" className="text-black text-base no-underline">
          <li className="list-none mr-10">Home</li>
        </NavLink>
        <NavLink to="/products" className="text-black text-base no-underline">
          <li className="list-none mr-10">Products</li>
        </NavLink>
        <NavLink to="/login" className="text-black text-base no-underline">
          <li className="list-none mr-10">Login</li>
        </NavLink>
        <NavLink to="/cart" className="text-black text-base no-underline">
          <li className="list-none mr-10">Cart</li>
        </NavLink>
      </ul>
    </div>
  );
}
