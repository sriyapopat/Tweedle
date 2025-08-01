import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice.js';
import tweetReducer from './features/tweet/tweetSlice.js';
import commentReducer from './features/comment/commentSlice.js';
import userReducer from './features/user/userSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tweets: tweetReducer,
    comments: commentReducer,
    users: userReducer,
  },
});