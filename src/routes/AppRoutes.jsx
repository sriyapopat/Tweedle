import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from '../pages/Home.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import Profile from '../pages/Profile.jsx';
import UserProfile from '../pages/UserProfile.jsx';
import Tweet from '../pages/Tweet.jsx';
import PostPage from '../pages/PostPage.jsx';

const AppRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route 
        path="/login" 
        element={!isAuthenticated ? <Login /> : <Navigate to="/home" />} 
      />
      <Route 
        path="/register" 
        element={!isAuthenticated ? <Register /> : <Navigate to="/home" />} 
      />
      <Route 
        path="/home" 
        element={isAuthenticated ? <Home /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/profile" 
        element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/profile/:username" 
        element={isAuthenticated ? <UserProfile /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/tweet/:id" 
        element={isAuthenticated ? <Tweet /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/post" 
        element={isAuthenticated ? <PostPage /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/" 
        element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} 
      />
    </Routes>
  );
};

export default AppRoutes;