import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTweets = createAsyncThunk('tweets/fetchAll', async () => {
  const res = await axios.get('/api/tweets');
  return res.data;
});

export const fetchSingleTweet = createAsyncThunk('tweets/fetchOne', async (id) => {
  const res = await axios.get(`/api/tweets/${id}`);
  return res.data;
});

export const postTweet = createAsyncThunk('tweets/create', async (content) => {
  const res = await axios.post('/api/tweets', { content });
  return res.data;
});

export const addComment = createAsyncThunk('tweets/addComment', async ({ tweetId, text }) => {
  const res = await axios.post(`/api/tweets/${tweetId}/comments`, { text });
  return res.data;
});

const tweetSlice = createSlice({
  name: 'tweets',
  initialState: {
    tweets: [],
    singleTweet: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTweets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTweets.fulfilled, (state, action) => {
        state.loading = false;
        state.tweets = action.payload;
      })
      .addCase(fetchSingleTweet.fulfilled, (state, action) => {
        state.singleTweet = action.payload;
      })
      .addCase(postTweet.fulfilled, (state, action) => {
        state.tweets.unshift(action.payload);
      })
      .addCase(addComment.fulfilled, (state, action) => {
        if (state.singleTweet && state.singleTweet.id === action.payload.id) {
          state.singleTweet = action.payload;
        }
      });
  },
});

export default tweetSlice.reducer;
