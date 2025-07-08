import React from 'react';
import { useDispatch } from 'react-redux';
import TweetForm from '../components/TweetForm';
import { postTweet } from '../features/tweet/tweetSlice';

const Tweet = () => {
  const dispatch = useDispatch();

  const handlePost = (content) => {
    dispatch(postTweet(content));
  };

  return (
    <div>
      <h2>Create Tweet</h2>
      <TweetForm onPost={handlePost} />
    </div>
  );
};

export default Tweet;
