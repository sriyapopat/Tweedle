import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import users from '../data/users.js';
import '../styles/seacrchBar.css';
 

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (username) => {
    navigate(`/user/${username}`);
    setQuery('');
  };
  
  console.log("Query:", query);
  console.log("All Users:", users.map(u => u.username));
   console.log("Filtered Users:", filteredUsers.map(u => u.username));


  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query && (
        <ul className="search-results">
          {filteredUsers.map((user) => (
            <li key={user.id} onClick={() => handleSelect(user.username)}>
              {user.username}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
