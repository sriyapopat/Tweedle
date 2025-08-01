import { createSlice } from '@reduxjs/toolkit';
import { users } from '../../data/users.js'; // imported mock users array

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
      localStorage.setItem('tweedle_user', JSON.stringify(action.payload));
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    register: (state, action) => {
      const { email } = action.payload;
      const existingUser = users.find((u) => u.email === email);

      if (existingUser) {
        state.error = 'Email already exists';
        state.isAuthenticated = false;
        state.user = null;
      } else {
        const newUser = {
          id: Date.now(),
          ...action.payload,
          followers: 0,
          following: 0,
          avatar: `https://api.dicebear.com/6.x/initials/svg?seed=${action.payload.username}`,
          joinedDate: new Date().toISOString().split('T')[0],
        };

        users.push(newUser); // In-memory mock registration
        state.user = newUser;
        state.isAuthenticated = true;
        state.error = null;
        localStorage.setItem('tweedle_user', JSON.stringify(newUser));
      }
    },
    checkAuthStatus: (state) => {
      const storedUser = localStorage.getItem('tweedle_user');
      if (storedUser) {
        try {
          state.user = JSON.parse(storedUser);
          state.isAuthenticated = true;
        } catch (error) {
          localStorage.removeItem('tweedle_user');
        }
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      localStorage.removeItem('tweedle_user');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  register,
  checkAuthStatus,
  logout,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;
