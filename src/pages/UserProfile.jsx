import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../features/user/userSlice';
import { fetchTweets } from '../features/tweet/tweetSlice';
import TweetCard from '../components/TweetCard';
import ProfileInfo from '../components/ProfileInfo';
import Loader from '../components/Loader';

const UserProfile = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const { profiles, isLoading: userLoading, error } = useSelector((state) => state.users);
  const { tweets, isLoading: tweetsLoading } = useSelector((state) => state.tweets);
  
  const user = profiles[username];
  const userTweets = tweets.filter(tweet => tweet.user.username === username);

  useEffect(() => {
    dispatch(fetchUserProfile({ username }));
    dispatch(fetchTweets());
  }, [dispatch, username]);

  if (userLoading && !user) {
    return (
      <div className="profile-page">
        <div className="container">
          <div className="profile-content">
            <Loader size="large" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-page">
        <div className="container">
          <div className="profile-content">
            <div className="error-message">
              <p>Error loading user profile: {error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-page">
        <div className="container">
          <div className="profile-content">
            <div className="error-message">
              <p>User not found</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-content">
          <h1>@{user.username}</h1>
          
          <ProfileInfo user={user} isOwnProfile={false} />
          
          <div className="profile-tweets">
            <h2>Tweets</h2>
            
            {tweetsLoading ? (
              <Loader size="large" />
            ) : (
              <div className="tweets-list">
                {userTweets.map((tweet) => (
                  <TweetCard key={tweet.id} tweet={tweet} />
                ))}
                
                {userTweets.length === 0 && (
                  <div className="no-tweets">
                    <p>This user hasn't posted any tweets yet.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
