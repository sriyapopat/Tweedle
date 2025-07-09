import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const mockComments = {
  '1': [
    {
      id: 'c1',
      user: {
        id: '2',
        username: 'jane_doe',
        avatar: null,
      },
      content: 'Great to see you here! Welcome to the community 👋',
      timestamp: '2024-01-15T10:35:00Z',
      likes: 2,
      isLiked: false,
    },
    {
      id: 'c2',
      user: {
        id: '3',
        username: 'tech_guru',
        avatar: null,
      },
      content: 'Tweedle looks amazing! Love the clean design.',
      timestamp: '2024-01-15T10:40:00Z',
      likes: 1,
      isLiked: true,
    },
  ],
  '2': [
    {
      id: 'c3',
      user: {
        id: '1',
        username: 'demo_user',
        avatar: null,
      },
      content: 'Congratulations! React is such a powerful framework.',
      timestamp: '2024-01-15T09:20:00Z',
      likes: 3,
      isLiked: false,
    },
  ],
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async ({ tweetId }, { rejectWithValue }) => {
    try {
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: mockComments[tweetId] || [] });
        }, 600);
      });
      return { tweetId, comments: response.data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async ({ tweetId, content }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const newComment = {
        id: Date.now().toString(),
        user: {
          id: auth.user.id,
          username: auth.user.username,
          avatar: auth.user.avatar,
        },
        content,
        timestamp: new Date().toISOString(),
        likes: 0,
        isLiked: false,
      };
      
      await new Promise((resolve) => setTimeout(resolve, 400));
      
      return { tweetId, comment: newComment };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const commentSlice = createSlice({
  name: 'comments',
  initialState: {
    commentsByTweet: {},
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
      .addCase(fetchComments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.isLoading = false;
        const { tweetId, comments } = action.payload;
        state.commentsByTweet[tweetId] = comments;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const { tweetId, comment } = action.payload;
        if (!state.commentsByTweet[tweetId]) {
          state.commentsByTweet[tweetId] = [];
        }
        state.commentsByTweet[tweetId].push(comment);
      });
  },
});

export const { clearError } = commentSlice.actions;
export default commentSlice.reducer;
