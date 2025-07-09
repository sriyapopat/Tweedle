import React from 'react';
import { Heart } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { toggleLike } from '../features/tweet/tweetSlice';

const LikeButton = ({ tweetId, isLiked, likes, size = 18, className = '' }) => {
  const dispatch = useDispatch();

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleLike({ tweetId }));
  };

  return (
    <button 
      className={`like-button ${isLiked ? 'liked' : ''} ${className}`}
      onClick={handleLike}
      aria-label={isLiked ? 'Unlike' : 'Like'}
    >
      <Heart 
        size={size} 
        fill={isLiked ? 'currentColor' : 'none'} 
        className="like-icon"
      />
      <span className="like-count">{likes}</span>
    </button>
  );
};

export default LikeButton;
