import React from 'react';
import { User, Calendar } from 'lucide-react';

const ProfileInfo = ({ user, isOwnProfile = false }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <div className="profile-info">
      <div className="profile-header">
        <div className="profile-avatar">
          {user.avatar ? (
            <img src={user.avatar} alt={user.username} />
          ) : (
            <User size={48} />
          )}
        </div>
        <div className="profile-details">
          <h1 className="profile-username">@{user.username}</h1>
          <div className="profile-meta">
            <div className="profile-meta-item">
              <Calendar size={16} />
              <span>Joined {formatDate(user.joinedAt)}</span>
            </div>
          </div>
        </div>
      </div>
      
      {user.bio && (
        <div className="profile-bio">
          <p>{user.bio}</p>
        </div>
      )}
      
      <div className="profile-stats">
        <div className="profile-stat">
          <span className="stat-number">{user.tweetsCount || 0}</span>
          <span className="stat-label">Tweets</span>
        </div>
        <div className="profile-stat">
          <span className="stat-number">{user.followersCount || 0}</span>
          <span className="stat-label">Followers</span>
        </div>
        <div className="profile-stat">
          <span className="stat-number">{user.followingCount || 0}</span>
          <span className="stat-label">Following</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
