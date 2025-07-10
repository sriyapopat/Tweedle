import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postTweet } from '../features/tweet/tweetSlice';
import '../styles/tweetForm.css';

const TweetForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.tweets);
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.trim() === '') return;

    const resultAction = await dispatch(postTweet({ content }));

    if (postTweet.fulfilled.match(resultAction)) {
      setContent('');
      if (onSuccess) onSuccess();
    }
  };

  return (
    <form className="tweet-form" onSubmit={handleSubmit}>
      <textarea
        className="tweet-textarea"
        placeholder="What's happening?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
      />
      <div className="tweet-actions">
        <button type="submit" className="tweet-button" disabled={isLoading}>
          {isLoading ? 'Posting...' : 'Tweet'}
        </button>
      </div>
    </form>
  );
};

export default TweetForm;
