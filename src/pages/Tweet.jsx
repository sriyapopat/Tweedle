import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, Heart, MessageCircle, User } from 'lucide-react';
import { fetchTweets, toggleLike } from '../features/tweet/tweetSlice';
import CommentSection from '../components/CommentSection';
import Loader from '../components/Loader';

const Tweet = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { tweets, isLoading } = useSelector((state) => state.tweets);
  
  const tweet = tweets.find(t => t.id === id);

  useEffect(() => {
    if (tweets.length === 0) {
      dispatch(fetchTweets());
    }
  }, [dispatch, tweets.length]);

  const handleLike = () => {
    dispatch(toggleLike({ tweetId: id }));
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  if (isLoading && !tweet) {
    return (
      <div className="tweet-page">
        <div className="container">
          <div className="tweet-content">
            <Loader size="large" />
          </div>
        </div>
      </div>
    );
  }

  if (!tweet) {
    return (
      <div className="tweet-page">
        <div className="container">
          <div className="tweet-content">
            <div className="error-message">
              <p>Tweet not found</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tweet-page">
      <div className="container">
        <div className="tweet-content">
          <div className="tweet-header">
            <Link to="/" className="back-button">
              <ArrowLeft size={20} />
              <span>Back to Home</span>
            </Link>
          </div>
          
          <div className="tweet-detail">
            <div className="tweet-user-info">
              <div className="tweet-avatar">
                {tweet.user.avatar ? (
                  <img src={tweet.user.avatar} alt={tweet.user.username} />
                ) : (
                  <User size={24} />
                )}
              </div>
              <div className="tweet-user-details">
                <Link to={`/user/${tweet.user.username}`} className="tweet-username">
                  @{tweet.user.username}
                </Link>
              </div>
            </div>
            
            <div className="tweet-content-text">
              <p>{tweet.content}</p>
            </div>
            
            <div className="tweet-timestamp">
              <span>{formatTime(tweet.timestamp)}</span>
            </div>
            
            <div className="tweet-actions">
              <button 
                className={`tweet-action-btn ${tweet.isLiked ? 'liked' : ''}`}
                onClick={handleLike}
              >
                <Heart size={20} fill={tweet.isLiked ? 'currentColor' : 'none'} />
                <span>{tweet.likes}</span>
              </button>
              
              <div className="tweet-action-btn">
                <MessageCircle size={20} />
                <span>{tweet.comments}</span>
              </div>
            </div>
          </div>
          
          <CommentSection tweetId={id} />
        </div>
      </div>
    </div>
  );
};

export default Tweet;
