import React, { useState } from 'react';

const LikeButton = ({ tweetId }) => {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);

  const toggleLike = () => {
    setLiked((prev) => !prev);
    setCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <button className="like-btn" onClick={toggleLike}>
      {liked ? '❤️' : '🤍'} {count}
    </button>
  );
};

export default LikeButton;
