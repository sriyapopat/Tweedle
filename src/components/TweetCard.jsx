import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, User } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { toggleLike } from '../features/tweet/tweetSlice';
import LikeButton from './LikeButton';

const TweetCard = ({ tweet }) => {
  const dispatch = useDispatch();

  const handleLike = (e) => {
    e.preventDefault();
    dispatch(toggleLike({ tweetId: tweet.id }));
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d`;
    }
  };

  return (
    <div className="tweet-card">
      <div className="tweet-header">
        <div className="tweet-user-info">
          <div className="tweet-avatar">
            {tweet.user.avatar ? (
              <img src={tweet.user.avatar} alt={tweet.user.username} />
            ) : (
              <User size={20} />
            )}
          </div>
          <div className="tweet-user-details">
            <Link to={`/user/${tweet.user.username}`} className="tweet-username">
              @{tweet.user.username}
            </Link>
            <span className="tweet-time">{formatTime(tweet.timestamp)}</span>
          </div>
        </div>
      </div>
      
      <Link to={`/post/${tweet.id}`} className="tweet-content-link">
        <div className="tweet-content">
          <p>{tweet.content}</p>
        </div>
      </Link>
      <LikeButton 
  tweetId={tweet.id}
  isLiked={tweet.isLiked}
  likes={tweet.likes}
  size={18}
  className="tweet-like-btn"
/>
      <div className="tweet-actions">
        <button 
          className={`tweet-action-btn ${tweet.isLiked ? 'liked' : ''}`}
          onClick={handleLike}
        >
          <Heart size={18} fill={tweet.isLiked ? 'currentColor' : 'none'} />
          <span>{tweet.likes}</span>
        </button>
        
        <Link to={`/post/${tweet.id}`} className="tweet-action-btn">
          <MessageCircle size={18} />
          <span>{tweet.comments}</span>
        </Link>
      </div>
    </div>
  );
};

export default TweetCard;
