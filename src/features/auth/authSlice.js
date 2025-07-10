import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (email === 'demo@tweedle.com' && password === 'demo123') {
            resolve({
              data: {
                user: {
                  id: '1',
                  username: 'demo_user',
                  email: 'demo@tweedle.com',
                  avatar: null,
                  bio: 'Demo user for Tweedle',
                  joinedAt: '2024-01-01',
                },
                token: 'mock-jwt-token-demo',
              },
            });
          } else if (email === 'demo1@tweedle.com' && password === 'demo1123') {
            resolve({
              data: {
                user: {
                  id: '2',
                  username: 'demo1_user',
                  email: 'demo1@tweedle.com',
                  avatar: null,
                  bio: 'Second demo user',
                  joinedAt: '2020-09-08',
                },
                token: 'mock-jwt-token-demo1',
              },
            });
          } else {
            reject(new Error('Invalid credentials'));
          }
        }, 1000);
      });

      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            data: {
              user: {
                id: Date.now().toString(),
                username,
                email,
                avatar: null,
                bio: '',
                joinedAt: new Date().toISOString(),
              },
              token: 'mock-jwt-token',
            },
          });
        }, 1000);
      });

      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token'),
    isLoading: false,
    error: null,
  },
  reducers: {
  followUser: (state, action) => {
    const userId = action.payload;
    if (!state.user.following.includes(userId)) {
      state.user.following.push(userId);
    }
  },
  unfollowUser: (state, action) => {
    const userId = action.payload;
    state.user.following = state.user.following.filter(id => id !== userId);
  },
  // ... other reducers
},
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.user = null;
      state.token = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError, followUser, unfollowUser } = authSlice.actions;
export default authSlice.reducer;

