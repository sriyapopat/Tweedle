import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const mockTweets = [
  {
    id: '1',
    user: {
      id: '1',
      username: 'demo_user',
      avatar: null,
    },
    content: 'Welcome to Tweedle! This is a demo tweet to show how the app works. 🚀',
    timestamp: '2024-01-15T10:30:00Z',
    likes: 5,
    comments: 2,
    isLiked: false,
  },
  {
    id: '2',
    user: {
      id: '2',
      username: 'jane_doe',
      avatar: null,
    },
    content: 'Just finished building my first React app! The feeling is amazing 💻✨',
    timestamp: '2024-01-15T09:15:00Z',
    likes: 12,
    comments: 4,
    isLiked: true,
  },
  {
    id: '3',
    user: {
      id: '3',
      username: 'tech_guru',
      avatar: null,
    },
    content: 'Redux Toolkit makes state management so much easier. If you\'re still using regular Redux, give RTK a try!',
    timestamp: '2024-01-15T08:45:00Z',
    likes: 8,
    comments: 1,
    isLiked: false,
  },
];

export const fetchTweets = createAsyncThunk(
  'tweets/fetchTweets',
  async (_, { rejectWithValue }) => {
    try {
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: mockTweets });
        }, 800);
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const postTweet = createAsyncThunk(
  'tweets/postTweet',
  async ({ content }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const newTweet = {
        id: Date.now().toString(),
        user: {
          id: auth.user.id,
          username: auth.user.username,
          avatar: auth.user.avatar,
        },
        content,
        timestamp: new Date().toISOString(),
        likes: 0,
        comments: 0,
        isLiked: false,
      };
      
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      return newTweet;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleLike = createAsyncThunk(
  'tweets/toggleLike',
  async ({ tweetId }, { getState, rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      
      const { tweets } = getState();
      const tweet = tweets.tweets.find(t => t.id === tweetId);
      const newLikeStatus = !tweet.isLiked;
      const newLikeCount = newLikeStatus ? tweet.likes + 1 : tweet.likes - 1;
      
      return { tweetId, isLiked: newLikeStatus, likes: newLikeCount };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const tweetSlice = createSlice({
  name: 'tweets',
  initialState: {
    tweets: [],
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
      .addCase(fetchTweets.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTweets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tweets = action.payload;
      })
      .addCase(fetchTweets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(postTweet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postTweet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tweets.unshift(action.payload);
      })
      .addCase(postTweet.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(toggleLike.fulfilled, (state, action) => {
        const { tweetId, isLiked, likes } = action.payload;
        const tweet = state.tweets.find(t => t.id === tweetId);
        if (tweet) {
          tweet.isLiked = isLiked;
          tweet.likes = likes;
        }
      });
  },
});

export const { clearError } = tweetSlice.actions;
export default tweetSlice.reducer;
