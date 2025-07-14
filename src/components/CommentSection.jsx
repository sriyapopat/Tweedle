import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Send } from 'lucide-react';

const CommentSection = ({ tweet, onAddComment }) => {
  const [newComment, setNewComment] = useState('');
  const { user } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment.trim());
      setNewComment('');
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold text-white mb-4">
        Comments ({tweet.comments?.length || 0})
      </h3>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex items-start space-x-3">
          <img
            src={user?.avatar}
            alt={user?.username}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 resize-none focus:outline-none focus:border-blue-500"
              rows="3"
            />
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-4 py-2 rounded-full transition-colors"
              >
                <Send className="h-4 w-4 text-white" />
                <span className="text-white">Comment</span>
              </button>
            </div>
          </div>
        </div>
      </form>
      
      <div className="space-y-4">
        {tweet.comments?.map((comment) => (
          <div key={comment.id} className="flex items-start space-x-3 p-4 bg-gray-800 rounded-lg">
            <img
              src={`https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop`}
              alt={comment.username}
              className="w-8 h-8 rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-medium text-white">@{comment.username}</span>
                <span className="text-gray-500 text-sm">
                  {formatTimestamp(comment.timestamp)}
                </span>
              </div>
              <p className="text-gray-300">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;