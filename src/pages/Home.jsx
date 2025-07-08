import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTweets } from "../features/tweet/tweetSlice";
import TweetCard from "../components/TweetCard";

const Home = () => {
  const dispatch = useDispatch();
  const { tweets, loading, error } = useSelector((state) => state.tweets);

  useEffect(() => {
    dispatch(fetchTweets());
  }, [dispatch]);

  if (loading) return <p>Loading tweets...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Home Feed</h2>
      {Array.isArray(tweets) && tweets.map((tweet) => (
        <TweetCard key={tweet._id} tweet={tweet} />
      ))}
    </div>
  );
};

export default Home;
