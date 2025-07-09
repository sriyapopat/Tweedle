import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User, Heart } from 'lucide-react';
import { fetchComments, addComment } from '../features/comment/commentSlice';

const CommentSection = ({ tweetId }) => {
  const [newComment, setNewComment] = useState('');
  const dispatch = useDispatch();
  const { commentsByTweet, isLoading } = useSelector((state) => state.comments);
  const { user } = useSelector((state) => state.auth);
  
  const comments = commentsByTweet[tweetId] || [];

  useEffect(() => {
    dispatch(fetchComments({ tweetId }));
  }, [dispatch, tweetId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const result = await dispatch(addComment({ 
        tweetId, 
        content: newComment.trim() 
      }));
      if (result.type === 'comments/addComment/fulfilled') {
        setNewComment('');
      }
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d`;
    }
  };

  return (
    <div className="comment-section">
      {user && (
        <form onSubmit={handleSubmit} className="comment-form">
          <div className="comment-form-header">
            <div className="comment-avatar">
              {user.avatar ? (
                <img src={user.avatar} alt={user.username} />
              ) : (
                <User size={20} />
              )}
            </div>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="comment-textarea"
              rows={3}
              maxLength={280}
            />
          </div>
          <div className="comment-form-footer">
            <span className="comment-character-count">
              {newComment.length}/280
            </span>
            <button
              type="submit"
              className="btn-primary comment-btn"
              disabled={!newComment.trim() || isLoading}
            >
              Comment
            </button>
          </div>
        </form>
      )}
      
      <div className="comments-list">
        {isLoading && comments.length === 0 ? (
          <div className="comments-loading">Loading comments...</div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <div className="comment-header">
                <div className="comment-user-info">
                  <div className="comment-avatar">
                    {comment.user.avatar ? (
                      <img src={comment.user.avatar} alt={comment.user.username} />
                    ) : (
                      <User size={16} />
                    )}
                  </div>
                  <span className="comment-username">@{comment.user.username}</span>
                  <span className="comment-time">{formatTime(comment.timestamp)}</span>
                </div>
              </div>
              <div className="comment-content">
                <p>{comment.content}</p>
              </div>
              <div className="comment-actions">
                <button className="comment-action-btn">
                  <Heart size={14} fill={comment.isLiked ? 'currentColor' : 'none'} />
                  <span>{comment.likes}</span>
                </button>
              </div>
            </div>
          ))
        )}
        
        {comments.length === 0 && !isLoading && (
          <div className="no-comments">
            <p>No comments yet. Be the first to comment!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
