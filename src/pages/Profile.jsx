import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTweets } from '../features/tweet/tweetSlice';
import TweetCard from '../components/TweetCard';
import ProfileInfo from '../components/ProfileInfo';
import Loader from '../components/Loader';

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { tweets, isLoading } = useSelector((state) => state.tweets);

  useEffect(() => {
    dispatch(fetchTweets());
  }, [dispatch]);

  // Filter tweets by current user
  const userTweets = tweets.filter(tweet => tweet.user.id === user?.id);

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-content">
          <h1>Profile</h1>
          
          {user && <ProfileInfo user={user} isOwnProfile={true} />}
          
          <div className="profile-tweets">
            <h2>Your Tweets</h2>
            
            {isLoading ? (
              <Loader size="large" />
            ) : (
              <div className="tweets-list">
                {userTweets.map((tweet) => (
                  <TweetCard key={tweet.id} tweet={tweet} />
                ))}
                
                {userTweets.length === 0 && (
                  <div className="no-tweets">
                    <p>You haven't posted any tweets yet.</p>
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

export default Profile;
