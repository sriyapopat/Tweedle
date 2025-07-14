import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Home, User, PenTool, LogOut, Twitter } from 'lucide-react';
import { logout } from '../features/auth/authSlice.js';
import SearchBar from './SearchBar.jsx';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const isLoginPage = location.pathname === '/login' || location.pathname === '/register';

  if (isLoginPage) {
    return (
      <nav className="bg-black border-b border-gray-800 px-6 py-4">
        <div className="max-w-6xl mx-auto">
          <Link to="/" className="flex items-center space-x-2">
            <Twitter className="h-8 w-8 text-blue-400" />
            <span className="text-xl font-bold text-white">Tweedle</span>
          </Link>
        </div>
      </nav>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <nav className="bg-black border-b border-gray-800 px-6 py-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/home" className="flex items-center space-x-2">
          <Twitter className="h-8 w-8 text-blue-400" />
          <span className="text-xl font-bold text-white">Tweedle</span>
        </Link>

        <div className="flex-1 max-w-md mx-8">
          <SearchBar />
        </div>

        <div className="flex items-center space-x-4">
          <Link
            to="/home"
            className="flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-gray-900 transition-colors"
          >
            <Home className="h-5 w-5 text-gray-300" />
            <span className="text-gray-300 hidden sm:block">Home</span>
          </Link>
          
          <Link
            to="/profile"
            className="flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-gray-900 transition-colors"
          >
            <User className="h-5 w-5 text-gray-300" />
            <span className="text-gray-300 hidden sm:block">Profile</span>
          </Link>
          
          <Link
            to="/post"
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors"
          >
            <PenTool className="h-5 w-5 text-white" />
            <span className="text-white hidden sm:block">Post</span>
          </Link>
          
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-red-900 transition-colors"
          >
            <LogOut className="h-5 w-5 text-red-400" />
            <span className="text-red-400 hidden sm:block">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;