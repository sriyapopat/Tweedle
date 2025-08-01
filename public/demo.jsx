import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import users from '../data/users';
import { useSelector } from 'react-redux';

const UserProfile = () => {
  const { username } = useParams();
  const { user: loggedInUser } = useSelector((state) => state.auth);

  const [targetUser, setTargetUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const foundUser = users.find(u => u.username === username);
    setTargetUser(foundUser);

    if (foundUser && loggedInUser) {
      setIsFollowing(foundUser.followers.includes(loggedInUser.id));
    }
  }, [username, loggedInUser]);

  const toggleFollow = () => {
    if (!targetUser || !loggedInUser) return;

    // Fake follow toggle logic (not permanent unless saved to DB)
    if (isFollowing) {
      targetUser.followers = targetUser.followers.filter(id => id !== loggedInUser.id);
    } else {
      targetUser.followers.push(loggedInUser.id);
    }

    setIsFollowing(!isFollowing);
  };

  if (!targetUser) return <p>User not found.</p>;

  return (
    <div className="user-profile">
      <h2>{targetUser.username}'s Profile</h2>
      <p>{targetUser.bio}</p>
      <p>Joined: {targetUser.joinedAt}</p>

      {loggedInUser?.id !== targetUser.id && (
        <button onClick={toggleFollow}>
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
      )}
    </div>
  );
};

export default UserProfile;
