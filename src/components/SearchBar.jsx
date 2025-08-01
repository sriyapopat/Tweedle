import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { searchUsers } from '../features/user/userSlice.js';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchResults } = useSelector((state) => state.users);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.trim()) {
      dispatch(searchUsers(value));
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  const handleUserClick = (username) => {
    navigate(`/profile/${username}`);
    setQuery('');
    setShowResults(false);
  };

  const clearSearch = () => {
    setQuery('');
    setShowResults(false);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search users..."
          value={query}
          onChange={handleSearch}
          className="w-full bg-gray-900 border border-gray-700 rounded-full py-2 pl-10 pr-10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-gray-900 border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
          {searchResults.length > 0 ? (
            searchResults.map((user) => (
              <button
                key={user.id}
                onClick={() => handleUserClick(user.username)}
                className="w-full px-4 py-3 text-left hover:bg-gray-800 transition-colors border-b border-gray-700 last:border-b-0"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="text-white font-medium">@{user.username}</p>
                    <p className="text-gray-400 text-sm truncate">{user.bio}</p>
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className="px-4 py-3 text-gray-400">No users found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;