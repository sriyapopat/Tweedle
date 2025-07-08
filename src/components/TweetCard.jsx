import React from 'react';
import LikeButton from './LikeButton';
import { Link } from 'react-router-dom';
import '../styles/tweetCard.css';

const TweetCard = ({ tweet }) => {
  return (
    <div className="tweet-card">
      <Link to={`/user/${tweet.username}`} className="username">@{tweet.username}</Link>
      <p className="content">{tweet.content}</p>
      <LikeButton tweetId={tweet.id} />
      <Link to={`/post/${tweet.id}`} className="comments-link">
        {tweet.comments?.length || 0} Comments
      </Link>
    </div>
  );
};

export default TweetCard;
