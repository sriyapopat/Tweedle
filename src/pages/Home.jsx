import { useSelector } from 'react-redux';
import TweetCard from '../components/TweetCard.jsx';
import Navbar from '../components/Navbar.jsx';

const Home = () => {
  const { tweets } = useSelector((state) => state.tweets);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Home</h1>
          <p className="text-gray-400">See what's happening in your world</p>
        </div>
        
        <div className="space-y-4">
          {tweets.length > 0 ? (
            tweets.map((tweet) => (
              <TweetCard key={tweet.id} tweet={tweet} />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No tweets yet</p>
              <p className="text-gray-500">Be the first to share something!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;