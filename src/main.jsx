// ✅ src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// ✅ CSS imports go here
import './styles/globals.css';
import './styles/navbar.css';
import './styles/tweetCard.css';
import './styles/profile.css';
import './styles/homepage.css';
import './styles/resposive.css';
import './styles/loader.css';
import './styles/likeButton.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
