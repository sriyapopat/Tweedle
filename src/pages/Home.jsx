import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTweets } from '../features/tweet/tweetSlice';
import TweetCard from '../components/TweetCard';
import TweetForm from '../components/TweetForm';
import Loader from '../components/Loader';

const Home = () => {
  const dispatch = useDispatch();
  const { tweets, isLoading, error } = useSelector((state) => state.tweets);

  useEffect(() => {
    dispatch(fetchTweets());
  }, [dispatch]);

  const handleTweetSuccess = () => {
    // Tweet was posted successfully, the state is already updated
  };

  return (
    <div className="home-page">
      <div className="container">
        <div className="home-content">
          <h1>Home</h1>
          
          <TweetForm onSuccess={handleTweetSuccess} />
          
          {isLoading && tweets.length === 0 ? (
            <Loader size="large" />
          ) : error ? (
            <div className="error-message">
              <p>Error loading tweets: {error}</p>
            </div>
          ) : (
            <div className="tweets-list">
              {tweets.map((tweet) => (
                <TweetCard key={tweet.id} tweet={tweet} />
              ))}
              
              {tweets.length === 0 && (
                <div className="no-tweets">
                  <p>No tweets yet. Be the first to post something!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
