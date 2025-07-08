import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Tweet from "../pages/Tweet";
import UserProfile from "../pages/UserProfile";
import PostPage from "../pages/PostPage";

const AppRoutes = () => {
  const location = useLocation();
  const hideNavbarOn = ['/login', '/register'];
  const hideNavbar = hideNavbarOn.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/tweet" element={<Tweet />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user/:username" element={<UserProfile />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default AppRoutes; // ✅ make it default
