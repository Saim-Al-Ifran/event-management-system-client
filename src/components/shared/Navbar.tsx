import React, { useState } from 'react';
import { Button } from "@material-tailwind/react";
import { Link, useLocation } from 'react-router-dom';
import UserProfile from '../Profile/UserProfile';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useGetSettingsQuery } from '../../features/settings/settingsApi';
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const getUser = useSelector((state: RootState)=>state.auth);
  const { data: settingsData} = useGetSettingsQuery();  
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'border-opacity-100 text-[#506aff]' : 'border-opacity-0';
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="header sticky top-0 bg-white shadow-md flex items-center justify-between px-8 py-2 z-10">
        <div className="w-3/12 flex items-center">
          <Link to="/" className="flex items-center">
              <img
              src={settingsData?.siteLogo}   
              alt="Logo"
              className="w-12 h-12 object-contain"
            />
            <span className="ml-2 text-xl font-bold text-black duration-200">
              {settingsData?.siteName}
            </span>
          </Link>
        </div>
        <nav className="nav font-semibold text-lg hidden md:flex">
          <ul className="flex items-center">
            <li className={`p-4 border-b-2 border-[#506aff]  duration-200 cursor-pointer ${isActive('/')}`}>
              <Link to="/"><i className="fa-solid fa-house-chimney mr-1"></i>Home</Link>
            </li>
            <li className={`p-4 border-b-2 border-[#506aff] duration-200 cursor-pointer ${isActive('/events')}`}>
              <Link to="/events"><i className="fa-solid fa-calendar-alt mr-1"></i>Events</Link>
            </li>
            <li className={`p-4 border-b-2 border-[#506aff]  duration-200 cursor-pointer ${isActive('/categories')}`}>
              <Link to="/categories"><i className="fa-solid fa-list mr-1"></i>Categories</Link>
            </li>
            <li className={`p-4 border-b-2 border-[#506aff]  duration-200 cursor-pointer ${isActive('/about')}`}>
              <Link to="/about"><i className="fa-solid fa-info-circle mr-1"></i>About Us</Link>
            </li>
            <li className={`p-4 border-b-2 border-[#506aff]  duration-200 cursor-pointer ${isActive('/contact')}`}>
              <Link to="/contact"><i className="fa-solid fa-envelope mr-1"></i>Contact Us</Link>
            </li>
          </ul>
        </nav>
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-[#506aff] focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div> 
        {getUser?.user?.role === 'user' ? (
           <UserProfile />
        ) : (
          <div className="hidden md:flex w-3/12 justify-end">
          <Link to="/login">
            <Button
              type="submit"
              size="md"
              fullWidth
              className="mb-4 bg-[#3F51B5] flex items-center justify-center"
              {...(undefined as any)}
            > <i className="fa-solid fa-user mr-1"></i>
              Login
            </Button>
          </Link>
        </div>
        )}

      
        {isOpen && (
          <div className="md:hidden absolute top-12 left-0 w-full bg-white shadow-md z-10">
            <ul className="flex flex-col items-center">
              <li className={`p-4 border-b-2 border-[#506aff] duration-200 cursor-pointer ${isActive('/')}`}>
                <Link to="/" onClick={toggleMenu}><i className="fa-solid fa-house-chimney mr-1"></i>Home</Link>
              </li>
              <li className={`p-4 border-b-2 border-[#506aff] duration-200 cursor-pointer ${isActive('/events')}`}>
                <Link to="/events" onClick={toggleMenu}><i className="fa-solid fa-calendar-alt mr-1"></i>Events</Link>
              </li>
              <li className={`p-4 border-b-2 border-[#506aff] duration-200 cursor-pointer ${isActive('/categories')}`}>
                <Link to="/categories" onClick={toggleMenu}><i className="fa-solid fa-list mr-1"></i>Categories</Link>
              </li>
              <li className={`p-4 border-b-2 border-[#506aff] duration-200 cursor-pointer ${isActive('/about')}`}>
                <Link to="/about" onClick={toggleMenu}><i className="fa-solid fa-info-circle mr-1"></i>About Us</Link>
              </li>
              <li className={`p-4 border-b-2 border-[#506aff] duration-200 cursor-pointer ${isActive('/contact')}`}>
                <Link to="/contact" onClick={toggleMenu}><i className="fa-solid fa-envelope mr-1"></i>Contact Us</Link>
              </li>
              <li className="p-4  text-center">
                <Link to="/login" onClick={toggleMenu}>
                <Button
                  type="submit"
                  size="md"
                  className="mb-4 bg-[#3F51B5] flex items-center justify-center"
                  {...(undefined as any)}
                > 
                  <i className="fa-solid fa-user mr-1"></i>
                  Login
                </Button>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
