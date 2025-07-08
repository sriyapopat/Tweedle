import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import AppRoutes from './routes/AppRoutes';
import store from './store';

import './styles/globals.css';
import './styles/tweetCard.css';
import './styles/profile.css';
import './styles/resposive.css';
import './styles/navbar.css';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
