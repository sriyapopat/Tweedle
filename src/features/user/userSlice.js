import { createSlice } from '@reduxjs/toolkit';
import { users as initialUsers } from '../../data/users.js';

const initialState = {
  users: initialUsers,
  followedUsers: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    searchUsers: (state, action) => {
      const query = action.payload.toLowerCase();
      state.users = initialUsers.filter(user =>
        user.username.toLowerCase().includes(query)
      );
    },
    followUser: (state, action) => {
      const userId = action.payload;
      if (!state.followedUsers.includes(userId)) {
        state.followedUsers.push(userId);
        const user = state.users.find(u => u.id === userId);
        if (user) {
          user.followers += 1;
        }
      }
    },
    unfollowUser: (state, action) => {
      const userId = action.payload;
      state.followedUsers = state.followedUsers.filter(id => id !== userId);
      const user = state.users.find(u => u.id === userId);
      if (user && user.followers > 0) {
        user.followers -= 1;
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { 
  setUsers, 
  searchUsers,  // ✅ now exported!
  followUser, 
  unfollowUser, 
  setLoading, 
  setError 
} = userSlice.actions;
export default userSlice.reducer;
