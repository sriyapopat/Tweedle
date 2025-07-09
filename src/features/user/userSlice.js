import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const mockUsers = {
  'demo_user': {
    id: '1',
    username: 'demo_user',
    email: 'demo@tweedle.com',
    avatar: null,
    bio: 'Demo user for Tweedle',
    joinedAt: '2024-01-01',
    tweetsCount: 1,
    followersCount: 25,
    followingCount: 10,
  },
  'jane_doe': {
    id: '2',
    username: 'jane_doe',
    email: 'jane@example.com',
    avatar: null,
    bio: 'Frontend developer passionate about React and modern web technologies',
    joinedAt: '2024-01-05',
    tweetsCount: 12,
    followersCount: 156,
    followingCount: 89,
  },
  'tech_guru': {
    id: '3',
    username: 'tech_guru',
    email: 'guru@tech.com',
    avatar: null,
    bio: 'Senior Software Engineer | React & Node.js enthusiast | Open source contributor',
    joinedAt: '2023-12-15',
    tweetsCount: 45,
    followersCount: 892,
    followingCount: 234,
  },
};

export const fetchUserProfile = createAsyncThunk(
  'users/fetchUserProfile',
  async ({ username }, { rejectWithValue }) => {
    try {
      const response = await new Promise((resolve, reject) => {
        setTimeout(() => {
          const user = mockUsers[username];
          if (user) {
            resolve({ data: user });
          } else {
            reject(new Error('User not found'));
          }
        }, 800);
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState: {
    profiles: {},
    isLoading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        const user = action.payload;
        state.profiles[user.username] = user;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;
