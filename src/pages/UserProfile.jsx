import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../features/user/userSlice';
import ProfileInfo from '../components/ProfileInfo';

const UserProfile = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUserProfile(username));
  }, [dispatch, username]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>User Profile</h2>
      <ProfileInfo user={user} />
    </div>
  );
};

export default UserProfile;
