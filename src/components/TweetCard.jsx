import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Heart, MessageCircle } from 'lucide-react';
import { likeTweet } from '../features/tweet/tweetSlice.js';

const TweetCard = ({ tweet }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.users);

  const tweetUser = users.find((u) => u.id === tweet.userId);

  // ✅ Safe fallback: if likedBy is undefined, use empty array
  const isLiked = (tweet.likedBy || []).includes(user?.id);

  const handleLike = (e) => {
    e.stopPropagation();
    if (!user) return;
    dispatch(likeTweet({ tweetId: tweet.id, userId: user.id }));
  };

  const handleUserClick = (e) => {
    e.stopPropagation();
    navigate(`/profile/${tweet.username}`);
  };

  const handleTweetClick = () => {
    navigate(`/tweet/${tweet.id}`);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'now';
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;
    return date.toLocaleDateString();
  };

  return (
    <div
      onClick={handleTweetClick}
      className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:bg-gray-800 transition-colors cursor-pointer"
    >
      <div className="flex items-start space-x-3">
        <img
          src={tweetUser?.avatar || 'https://via.placeholder.com/50'}
          alt={tweet.username}
          className="w-12 h-12 rounded-full"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <button
              onClick={handleUserClick}
              className="font-bold text-white hover:text-blue-400 transition-colors"
            >
              @{tweet.username}
            </button>
            <span className="text-gray-500 text-sm">·</span>
            <span className="text-gray-500 text-sm">
              {formatTimestamp(tweet.timestamp)}
            </span>
          </div>

          <p className="text-gray-100 mb-4 leading-relaxed">{tweet.content}</p>

          <div className="flex items-center space-x-6">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 group ${
                isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
              } transition-colors`}
            >
              <Heart
                className={`h-5 w-5 group-hover:scale-110 transition-transform ${
                  isLiked ? 'fill-current' : ''
                }`}
              />
              <span className="text-sm">{tweet.likes}</span>
            </button>

            <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors group">
              <MessageCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="text-sm">{tweet.comments?.length || 0}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetCard;
