import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setActiveSection(prevSection => (prevSection === section ? null : section));
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-30 transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } overflow-y-auto bg-gray-800 text-white transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 w-64`}
    >
      <div className="flex items-center justify-between p-4 lg:hidden">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <button
          onClick={toggleSidebar}
          className="focus:outline-none text-white"
        >
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
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>

      <div className="flex flex-col p-4 space-y-4">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `flex items-center p-2 space-x-3 rounded-md hover:bg-gray-700 hover:text-white ${
              isActive ? 'bg-gray-700 text-white' : ''
            }`
          }
        >
          <i className="fa-solid fa-house"></i>
          <span>Dashboard</span>
        </NavLink>

        {/* Users Management */}
        <div>
          <button
            onClick={() => toggleSection('users')}
            className="flex items-center justify-between w-full p-2 space-x-3 rounded-md hover:bg-gray-700 hover:text-white"
          >
            <div className="flex items-center space-x-3">
              <i className="fa-solid fa-users"></i>
              <span>Users</span>
            </div>
            <i
              className={`fas fa-chevron-down transform transition-transform ${
                activeSection === 'users' ? 'rotate-180' : ''
              }`}
            ></i>
          </button>
          {activeSection === 'users' && (
            <div className="ml-6 space-y-2">
              <NavLink
                to="/dashboard/users/add"
                className={({ isActive }) =>
                  `block p-2 rounded-md hover:bg-gray-700 hover:text-white ${
                    isActive ? 'bg-gray-700 text-white' : ''
                  }`
                }
              >
                Add User
              </NavLink>
              <NavLink
                to="/dashboard/users/retrieve"
                className={({ isActive }) =>
                  `block p-2 rounded-md hover:bg-gray-700 hover:text-white ${
                    isActive ? 'bg-gray-700 text-white' : ''
                  }`
                }
              >
                Retrieve Users
              </NavLink>
            </div>
          )}
        </div>

        {/* Category Management */}
        <div>
          <button
            onClick={() => toggleSection('category')}
            className="flex items-center justify-between w-full p-2 space-x-3 rounded-md hover:bg-gray-700 hover:text-white"
          >
            <div className="flex items-center space-x-3">
              <i className="fa-solid fa-layer-group"></i>
              <span>Category </span>
            </div>
            <i
              className={`fas fa-chevron-down transform transition-transform ${
                activeSection === 'category' ? 'rotate-180' : ''
              }`}
            ></i>
          </button>
          {activeSection === 'category' && (
            <div className="ml-6 space-y-2">
              <NavLink
                to="/dashboard/categories/add"
                className={({ isActive }) =>
                  `block p-2 rounded-md hover:bg-gray-700 hover:text-white ${
                    isActive ? 'bg-gray-700 text-white' : ''
                  }`
                }
              >
                Add Category
              </NavLink>
              <NavLink
                to="/dashboard/categories/retrieve"
                className={({ isActive }) =>
                  `block p-2 rounded-md hover:bg-gray-700 hover:text-white ${
                    isActive ? 'bg-gray-700 text-white' : ''
                  }`
                }
              >
                Retrieve Categories
              </NavLink>
            </div>
          )}
        </div>

        {/* Event Management */}
        <div>
          <button
            onClick={() => toggleSection('event')}
            className="flex items-center justify-between w-full p-2 space-x-3 rounded-md hover:bg-gray-700 hover:text-white"
          >
            <div className="flex items-center space-x-3">
              <i className="fa-regular fa-calendar-days"></i>
              <span>Event Management</span>
            </div>
            <i
              className={`fas fa-chevron-down transform transition-transform ${
                activeSection === 'event' ? 'rotate-180' : ''
              }`}
            ></i>
          </button>
          {activeSection === 'event' && (
            <div className="ml-6 space-y-2">
              <NavLink
                to="/dashboard/events/add"
                className={({ isActive }) =>
                  `block p-2 rounded-md hover:bg-gray-700 hover:text-white ${
                    isActive ? 'bg-gray-700 text-white' : ''
                  }`
                }
              >
                Add Event
              </NavLink>
              <NavLink
                to="/dashboard/events/retrieve"
                className={({ isActive }) =>
                  `block p-2 rounded-md hover:bg-gray-700 hover:text-white ${
                    isActive ? 'bg-gray-700 text-white' : ''
                  }`
                }
              >
                Retrieve Events
              </NavLink>
            </div>
          )}
        </div>

        {/* Other Links */}
        <NavLink
          to="/dashboard/bookings"
          className={({ isActive }) =>
            `flex items-center p-2 space-x-3 rounded-md hover:bg-gray-700 hover:text-white ${
              isActive ? 'bg-gray-700 text-white' : ''
            }`
          }
        >
          <i className="fa-solid fa-bookmark"></i>
          <span>Manage Bookings</span>
        </NavLink>
        <NavLink
          to="/dashboard/feedback"
          className={({ isActive }) =>
            `flex items-center p-2 space-x-3 rounded-md hover:bg-gray-700 hover:text-white ${
              isActive ? 'bg-gray-700 text-white' : ''
            }`
          }
        >
          <i className="fa-solid fa-comment"></i>
          <span>Feedback</span>
        </NavLink>
        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) =>
            `flex items-center p-2 space-x-3 rounded-md hover:bg-gray-700 hover:text-white ${
              isActive ? 'bg-gray-700 text-white' : ''
            }`
          }
        >
          <i className="fa-solid fa-gear"></i>
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
