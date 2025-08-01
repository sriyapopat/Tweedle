import { Calendar, Users, UserCheck } from 'lucide-react';

const ProfileInfo = ({ user, isOwnProfile = false, onFollow, onUnfollow, isFollowing = false }) => {
  const formatJoinDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <img
            src={user.avatar}
            alt={user.username}
            className="w-20 h-20 rounded-full border-2 border-gray-700"
          />
          <div>
            <h2 className="text-2xl font-bold text-white">@{user.username}</h2>
            <p className="text-gray-400">{user.email}</p>
          </div>
        </div>
        
        {!isOwnProfile && (
          <button
            onClick={isFollowing ? onUnfollow : onFollow}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
              isFollowing
                ? 'bg-gray-700 hover:bg-red-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <UserCheck className="h-4 w-4" />
            <span>{isFollowing ? 'Unfollow' : 'Follow'}</span>
          </button>
        )}
      </div>
      
      {user.bio && (
        <p className="text-gray-300 mb-4 leading-relaxed">{user.bio}</p>
      )}
      
      <div className="flex items-center space-x-6 text-sm text-gray-400">
        <div className="flex items-center space-x-1">
          <Calendar className="h-4 w-4" />
          <span>Joined {formatJoinDate(user.joinedDate)}</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span className="text-white font-medium">{user.following}</span>
            <span>Following</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-white font-medium">{user.followers}</span>
            <span>Followers</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;