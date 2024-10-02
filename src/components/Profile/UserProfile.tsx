import React from 'react' 
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { userLoggedOut } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';

const UserProfile:React.FC = ({user}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async() => {
    Cookies.remove('token');
    localStorage.removeItem('user');
    dispatch(userLoggedOut());
    toast.success("successfully logout");
    navigate('/');    
  };
  return (
    <>
       <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="User avatar"
                src={user?.image}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li><strong>{user?.username}</strong></li>
            <li>
              
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a onClick={handleLogout} >Logout</a>
            </li>
          </ul>
        </div>
    </>
  )
}

export default UserProfile
 
