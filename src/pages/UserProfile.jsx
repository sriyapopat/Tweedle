import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import ProfileInfo from '../components/ProfileInfo.jsx';
import TweetCard from '../components/TweetCard.jsx';
import { followUser, unfollowUser } from '../features/user/userSlice.js';

const UserProfile = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.users);
  const { tweets } = useSelector((state) => state.tweets);
  
  const [isFollowing, setIsFollowing] = useState(false);
  
  const profileUser = users.find(u => u.username === username);
  const userTweets = tweets.filter(tweet => tweet.username === username);

  const handleFollow = () => {
    dispatch(followUser({ 
      userId: currentUser.id, 
      targetUserId: profileUser.id 
    }));
    setIsFollowing(true);
  };

  const handleUnfollow = () => {
    dispatch(unfollowUser({ 
      userId: currentUser.id, 
      targetUserId: profileUser.id 
    }));
    setIsFollowing(false);
  };

  if (!profileUser) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">User not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <ProfileInfo 
          user={profileUser} 
          isOwnProfile={false}
          isFollowing={isFollowing}
          onFollow={handleFollow}
          onUnfollow={handleUnfollow}
        />
        
        <div className="mt-8">
          <h2 className="text-xl font-bold text-white mb-6">
            @{profileUser.username}'s Tweets
          </h2>
          <div className="space-y-4">
            {userTweets.length > 0 ? (
              userTweets.map((tweet) => (
                <TweetCard key={tweet.id} tweet={tweet} />
              ))
            ) : (
              <div className="text-center py-12 bg-gray-900 border border-gray-800 rounded-lg">
                <p className="text-gray-400 text-lg">No tweets yet</p>
                <p className="text-gray-500">@{profileUser.username} hasn't posted anything.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;