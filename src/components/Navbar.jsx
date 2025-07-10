import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { Home, Edit, User, LogOut } from 'lucide-react';
import logo from "../assets/logo.png";
import '../styles/navbar.css';
import SearchBar from './SearchBar'; 

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };
   

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <NavLink to="/" className="navbar-logo">
          <img src={logo} alt="Tweedle Logo" className="logo-img" />
        </NavLink>
      </div>

      
     
      {user && <SearchBar />}
      {user && (
        <div className="navbar-right">
          <NavLink to="/" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>
            <Home size={20} />
            <span>Home</span>     
          </NavLink>

          <NavLink to="/post" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>
            <Edit size={20} />
            <span>Post</span>
          </NavLink>

          <NavLink to="/profile" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>
            <User size={20} />
            <span>Profile</span>
          </NavLink>

          <button onClick={handleLogout} className="navbar-link navbar-logout">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
