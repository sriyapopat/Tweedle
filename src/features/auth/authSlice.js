import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await new Promise((resolve) => {
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
                token: 'mock-jwt-token',
              },
            });
          } else {
            throw new Error('Invalid credentials');
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

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
