import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import TweetForm from '../components/TweetForm';
import '../styles/tweetForm.css';

const PostPage = () => {
  const navigate = useNavigate();

  const handleTweetSuccess = () => {
    navigate('/');
  };

  // Inline styles
  const containerStyle = {
    width: '1000px',
    margin: '0 auto',
    padding: '2rem',
   
    borderRadius: '12px',
  };

  const headingStyle = {
    fontSize: '1.8rem',
    margin: '1rem 0',
    color: '#fff',
  };

  const backButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1.5rem',
    background: 'transparent',
    color: '#1DA1F2',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
  };

  return (
    <div className="post-page">
      <div style={containerStyle}>
        <div className="post-header">
          <button onClick={() => navigate('/')} style={backButtonStyle}>
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </button>
        </div>

        <h1 style={headingStyle}>Create a Tweet</h1>

        {/* Render TweetForm once here only */}
        <TweetForm onSuccess={handleTweetSuccess} />
      </div>
    </div>
  );
};

export default PostPage;
