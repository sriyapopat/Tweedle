import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk('auth/login', async (credentials) => {
  const res = await axios.post('/api/auth/login', credentials);
  return res.data;
});

export const registerUser = createAsyncThunk('auth/register', async (userData) => {
  const res = await axios.post('/api/auth/register', userData);
  return res.data;
});

export const fetchCurrentUser = createAsyncThunk('auth/me', async () => {
  const res = await axios.get('/api/auth/me');
  return res.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, registerUser.pending, fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, registerUser.fulfilled, fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, registerUser.rejected, fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
