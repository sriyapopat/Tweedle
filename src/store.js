import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import tweetReducer from './features/tweet/tweetSlice';
import commentReducer from './features/comment/commentSlice';
import userReducer from './features/user/userSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    tweets: tweetReducer,
    comments: commentReducer,
    users: userReducer,
  },
});

export default store;
