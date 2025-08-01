import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ArrowLeft, Heart, MessageCircle } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import CommentSection from '../components/CommentSection.jsx';
import { likeTweet } from '../features/tweet/tweetSlice.js';

const Tweet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { tweets } = useSelector((state) => state.tweets);
  const { users } = useSelector((state) => state.users);

  const tweet = tweets.find((t) => t.id === parseInt(id));
  const tweetUser = users.find((u) => u.id === tweet?.userId);

  // ✅ Safe fallback
  const isLiked = (tweet?.likedBy || []).includes(user?.id);

  const handleLike = () => {
    if (!tweet || !user) return;
    dispatch(likeTweet({ tweetId: tweet.id, userId: user.id }));
  };

  const handleAddComment = (content) => {
    // In real app, dispatch comment action
    console.log('Adding comment:', content);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!tweet) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">Tweet not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <div className="flex items-start space-x-4 mb-4">
            <img
              src={tweetUser?.avatar || 'https://via.placeholder.com/50'}
              alt={tweet?.username}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h2 className="text-xl font-bold text-white">@{tweet?.username}</h2>
              <p className="text-gray-400">{formatTimestamp(tweet.timestamp)}</p>
            </div>
          </div>

          <p className="text-gray-100 text-lg leading-relaxed mb-6">{tweet.content}</p>

          <div className="flex items-center space-x-8 py-4 border-t border-gray-800">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-3 group ${
                isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
              } transition-colors`}
            >
              <Heart
                className={`h-6 w-6 group-hover:scale-110 transition-transform ${
                  isLiked ? 'fill-current' : ''
                }`}
              />
              <span className="text-lg">{tweet.likes}</span>
            </button>

            <div className="flex items-center space-x-3 text-gray-500">
              <MessageCircle className="h-6 w-6" />
              <span className="text-lg">{tweet.comments?.length || 0}</span>
            </div>
          </div>

          <CommentSection tweet={tweet} onAddComment={handleAddComment} />
        </div>
      </div>
    </div>
  );
};

export default Tweet;
