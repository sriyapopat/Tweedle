import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css'; 
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";


<NavLink to="/" className="logo">
  <img src={logo} alt="Tweedle Logo" className="logo-img" />
</NavLink>

const Navbar = () => {
  return (
<nav className="navbar">
  <div className="navbar-left">
    <NavLink to="/" className="logo">
      <img src={logo} alt="Tweedle Logo" className="logo-img" />
    </NavLink>
  </div>
  <div className="navbar-right">
    <NavLink to="/">Home</NavLink>
    <NavLink to="/tweet">Tweet</NavLink>
    <NavLink to="/profile">Profile</NavLink>
    <NavLink to="/login">Login</NavLink>
  </div>
</nav>

  );
};

export default Navbar;


