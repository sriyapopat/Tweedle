import { createSlice } from '@reduxjs/toolkit';
import { tweets as mockTweets } from '../../data/users.js';

const initialState = {
  tweets: mockTweets.map(tweet => ({
    ...tweet,
    likedBy: tweet.likedBy || [],     // Ensure likedBy exists
    comments: tweet.comments || []    // Ensure comments exist
  })),
  loading: false,
  error: null,
};

const tweetSlice = createSlice({
  name: 'tweets',
  initialState,
  reducers: {
    // Add a new tweet
    addTweet: (state, action) => {
      state.tweets.unshift(action.payload);
    },

    // Like or unlike a tweet
    likeTweet: (state, action) => {
      const { tweetId, userId } = action.payload;
      const tweet = state.tweets.find(t => t.id === tweetId);
      if (tweet) {
        tweet.likedBy = tweet.likedBy || [];
        const isLiked = tweet.likedBy.includes(userId);
        if (isLiked) {
          tweet.likedBy = tweet.likedBy.filter(id => id !== userId);
          tweet.likes = Math.max(0, tweet.likes - 1);
        } else {
          tweet.likedBy.push(userId);
          tweet.likes += 1;
        }
      }
    },

    // Add a comment to a tweet
    addComment: (state, action) => {
      const { tweetId, comment } = action.payload;
      const tweet = state.tweets.find(t => t.id === tweetId);
      if (tweet) {
        tweet.comments = tweet.comments || [];
        tweet.comments.push(comment);
      }
    },

    // Set loading
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { addTweet, likeTweet, addComment, setLoading } = tweetSlice.actions;

// Async tweet creation simulation
export const createTweet = (tweetData) => (dispatch) => {
  dispatch(setLoading(true));

  setTimeout(() => {
    const newTweet = {
      id: Date.now(),
      ...tweetData,
      timestamp: new Date().toISOString(),
      likes: 0,
      likedBy: [],
      comments: [],
    };
    dispatch(addTweet(newTweet));
    dispatch(setLoading(false));
  }, 500);
};

export default tweetSlice.reducer;
