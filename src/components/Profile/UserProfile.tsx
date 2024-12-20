import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import avatar from '../../../public/images/avatar.png';
import { useGetUserProfileQuery } from '../../features/user/userApi';
import { userLoggedOut } from '../../features/auth/authSlice';
import { Link } from 'react-router-dom';

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: userData, isLoading } = useGetUserProfileQuery();
  const { image = avatar, username = 'Guest' } = userData?.profile || {};

  const handleLogout = async () => {
    Cookies.remove('token');
    localStorage.removeItem('user');
    dispatch(userLoggedOut());
    toast.success('Successfully logged out');
    navigate('/');
  };
  
  console.log(userData?.profile?.firebaseUID);
  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : !userData ? (
        <h1>No user data available</h1>
      ) : (
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt="User avatar" src={image}  referrerPolicy="no-referrer"/>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <strong>{username}</strong>
            </li>
            <li>
              <Link to="/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link to="/my_bookings" className="justify-between">
                  My Bookings
              </Link>
            </li>
            {!userData?.profile?.firebaseUID && (
                <li>
                <Link to="/change-password" className="justify-between">
                    Change password
                </Link>
              </li>
            ) }
   
            <li>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default UserProfile;
