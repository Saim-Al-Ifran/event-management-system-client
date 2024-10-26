import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { userLoggedOut } from '../../features/auth/authSlice';


interface TopNavBarProps {
  toggleSidebar: () => void;
}


const TopNavBar: React.FC<TopNavBarProps> = ({ toggleSidebar }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const handleLogout = async() => {
    Cookies.remove('token');
    localStorage.removeItem('user');
    dispatch(userLoggedOut());
    toast.success("successfully logout");
    navigate('/admin/login');    
  };

  return (
    <div className="navbar bg-base-100 shadow-md p-4 flex justify-between items-center">
      {/* Hamburger menu for mobile */}
      <button
        className="lg:hidden focus:outline-none"
        onClick={toggleSidebar}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>

      {/* Main content */}
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Event Verse</a>
      </div>

      {/* Right side controls */}
      <div className="flex-none gap-2">
  
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="User avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopNavBar;
