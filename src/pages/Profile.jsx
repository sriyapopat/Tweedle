import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar.jsx';
import ProfileInfo from '../components/ProfileInfo.jsx';
import TweetCard from '../components/TweetCard.jsx';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const { tweets } = useSelector((state) => state.tweets);
  
  const userTweets = tweets.filter(tweet => tweet.userId === user?.id);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <ProfileInfo user={user} isOwnProfile={true} />
        
        <div className="mt-8">
          <h2 className="text-xl font-bold text-white mb-6">Your Tweets</h2>
          <div className="space-y-4">
            {userTweets.length > 0 ? (
              userTweets.map((tweet) => (
                <TweetCard key={tweet.id} tweet={tweet} />
              ))
            ) : (
              <div className="text-center py-12 bg-gray-900 border border-gray-800 rounded-lg">
                <p className="text-gray-400 text-lg">No tweets yet</p>
                <p className="text-gray-500 mb-4">Share your first thought!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;