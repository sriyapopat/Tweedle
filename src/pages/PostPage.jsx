import Navbar from '../components/Navbar.jsx';
import TweetForm from '../components/TweetForm.jsx';

const PostPage = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Create a Tweet</h1>
          <p className="text-gray-400">Share your thoughts with the world</p>
        </div>
        
        <TweetForm />
      </div>
    </div>
  );
};

export default PostPage;