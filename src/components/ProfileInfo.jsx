import React from 'react';

const ProfileInfo = ({ user }) => {
  if (!user) return null;

  return (
    <div className="profile-info">
      <h2>@{user.username}</h2>
      <p>{user.bio}</p>
      <p>Tweets: {user.tweetsCount}</p>
      <p>Followers: {user.followersCount}</p>
      <p>Following: {user.followingCount}</p>
    </div>
  );
};

export default ProfileInfo;
