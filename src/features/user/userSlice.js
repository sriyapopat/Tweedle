import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserProfile = createAsyncThunk('users/fetchProfile', async (username) => {
  const res = await axios.get(`/api/users/${username}`);
  return res.data;
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    user: null,
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      });
  },
});

export default userSlice.reducer;
