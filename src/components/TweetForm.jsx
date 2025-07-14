import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Send } from 'lucide-react';
import { createTweet } from '../features/tweet/tweetSlice.js';
import Loader from './Loader.jsx';

const TweetForm = () => {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.tweets);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim() && user) {
      dispatch(createTweet({
        userId: user.id,
        username: user.username,
        content: content.trim(),
      }));
      setContent('');
      navigate('/home');
    }
  };

  const remainingChars = 280 - content.length;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
      <form onSubmit={handleSubmit}>
        <div className="flex items-start space-x-4">
          <img
            src={user?.avatar}
            alt={user?.username}
            className="w-12 h-12 rounded-full"
          />
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's happening?"
              className="w-full bg-transparent text-white text-xl placeholder-gray-500 resize-none focus:outline-none min-h-[120px]"
              maxLength={280}
              disabled={loading}
            />
            
            <div className="flex items-center justify-between mt-4">
              <span className={`text-sm ${
                remainingChars < 20 ? 'text-red-400' : 'text-gray-500'
              }`}>
                {remainingChars} characters remaining
              </span>
              
              <button
                type="submit"
                disabled={!content.trim() || loading || remainingChars < 0}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-6 py-2 rounded-full transition-colors"
              >
                {loading ? (
                  <Loader size="small" />
                ) : (
                  <>
                    <Send className="h-4 w-4 text-white" />
                    <span className="text-white font-medium">Tweet</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TweetForm;