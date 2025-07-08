import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleTweet, addComment } from '../features/tweet/tweetSlice';
import TweetCard from '../components/TweetCard';
import CommentSection from '../components/CommentSection';
import tweetSlice from '../features/tweet/tweetSlice';

const PostPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleTweet, loading } = useSelector((state) => state.tweets);

  useEffect(() => {
    dispatch(fetchSingleTweet(id));
  }, [dispatch, id]);

  const handleAddComment = (text) => {
    dispatch(addComment({ tweetId: id, text }));
  };

  if (loading || !singleTweet) return <p>Loading...</p>;

  return (
    <div>
      <h2>Tweet Details</h2>
      <TweetCard tweet={singleTweet} />
      <CommentSection comments={singleTweet.comments} onAddComment={handleAddComment} />
    </div>
  );
};

export default PostPage;
