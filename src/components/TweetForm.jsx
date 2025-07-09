import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postTweet } from '../features/tweet/tweetSlice';
import '../styles/tweetForm.css';

const TweetForm = ({ onSuccess }) => {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.tweets);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.trim()) {
      const result = await dispatch(postTweet({ content: content.trim() }));
      if (result.type === 'tweets/postTweet/fulfilled') {
        setContent('');
        if (onSuccess) onSuccess();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="tweet-form">
      <div className="tweet-form-content">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's happening?"
          className="tweet-textarea"
          rows={4}
          maxLength={280}
        />
        <div className="tweet-form-footer">
          <div className="character-count">
            <span className={content.length > 250 ? 'warning' : ''}>
              {content.length}/280
            </span>
          </div>
          <button
            type="submit"
            className="btn-primary tweet-btn"
            disabled={!content.trim() || isLoading}
          >
            {isLoading ? 'Posting...' : 'Post Tweet'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default TweetForm;
