import React, { useState } from 'react';

const CommentSection = ({ comments = [], onAddComment }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAddComment(text);
      setText('');
    }
  };

  return (
    <div className="comment-section">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment..."
        />
        <button type="submit">Post</button>
      </form>
      <div className="comments-list">
        {comments.map((c, i) => (
          <div key={i} className="comment">{c}</div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
