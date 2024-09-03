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
      } overflow-y-auto bg-[#1F2937] text-white transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 w-64`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 lg:hidden">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <button
          onClick={toggleSidebar}
          className="focus:outline-none text-white"
          aria-label="Close sidebar"
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

      {/* Sidebar Content */}
      <div className="flex flex-col p-4 space-y-4">
        {/* Dashboard Link */}
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `flex items-center p-2 space-x-3 rounded-md hover:bg-[#256caa] hover:text-white ${
              isActive ? 'bg-[#256caa] text-white' : ''
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
            aria-expanded={activeSection === 'users'}
            aria-controls="users-menu"
            className="flex items-center justify-between w-full p-2 space-x-3 rounded-md hover:bg-[#256caa] hover:text-white"
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
            <div id="users-menu" className="ml-6 space-y-2">
              <NavLink
                to="/dashboard/users"
                end
                className={({ isActive }) =>
                  `block p-2 rounded-md hover:bg-[#256caa] hover:text-white ${
                    isActive ? 'bg-[#256caa] text-white' : ''
                  }`
                }
              >
                All Users
              </NavLink>
              <NavLink
                to="/dashboard/users/add"
                end
                className={({ isActive }) =>
                  `block p-2 rounded-md hover:bg-[#256caa] hover:text-white ${
                    isActive ? 'bg-[#256caa] text-white' : ''
                  }`
                }
              >
                Add User
              </NavLink>
            </div>
          )}
        </div>

        {/* Category Management */}
        <div>
          <button
            onClick={() => toggleSection('category')}
            aria-expanded={activeSection === 'category'}
            aria-controls="category-menu"
            className="flex items-center justify-between w-full p-2 space-x-3 rounded-md hover:bg-[#256caa] hover:text-white"
          >
            <div className="flex items-center space-x-3">
              <i className="fa-solid fa-layer-group"></i>
              <span>Category</span>
            </div>
            <i
              className={`fas fa-chevron-down transform transition-transform ${
                activeSection === 'category' ? 'rotate-180' : ''
              }`}
            ></i>
          </button>
          {activeSection === 'category' && (
            <div id="category-menu" className="ml-6 space-y-2">
              <NavLink
                to="/dashboard/categories"
                end
                className={({ isActive }) =>
                  `block p-2 rounded-md hover:bg-[#256caa] hover:text-white ${
                    isActive ? 'bg-[#256caa] text-white' : ''
                  }`
                }
              >
                All Categories
              </NavLink>
              <NavLink
                to="/dashboard/category/add"
                end
                className={({ isActive }) =>
                  `block p-2 rounded-md hover:bg-[#256caa] hover:text-white ${
                    isActive ? 'bg-[#256caa] text-white' : ''
                  }`
                }
              >
                Add Category
              </NavLink>
            </div>
          )}
        </div>

        {/* Event Management */}
        <div>
          <button
            onClick={() => toggleSection('event')}
            aria-expanded={activeSection === 'event'}
            aria-controls="event-menu"
            className="flex items-center justify-between w-full p-2 space-x-3 rounded-md hover:bg-[#256caa] hover:text-white"
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
            <div id="event-menu" className="ml-6 space-y-2">
              <NavLink
                to="/dashboard/events"
                end
                className={({ isActive }) =>
                  `block p-2 rounded-md hover:bg-[#256caa] hover:text-white ${
                    isActive ? 'bg-[#256caa] text-white' : ''
                  }`
                }
              >
                All Events
              </NavLink>
              <NavLink
                to="/dashboard/event/add"
                end
                className={({ isActive }) =>
                  `block p-2 rounded-md hover:bg-[#256caa] hover:text-white ${
                    isActive ? 'bg-[#256caa] text-white' : ''
                  }`
                }
              >
                Add Event
              </NavLink>
            </div>
          )}
        </div>

        {/* Other Links */}
        <NavLink
          to="/dashboard/bookings"
          className={({ isActive }) =>
            `flex items-center p-2 space-x-3 rounded-md hover:bg-[#256caa] hover:text-white ${
              isActive ? 'bg-[#256caa] text-white' : ''
            }`
          }
        >
          <i className="fa-solid fa-bookmark"></i>
          <span>Manage Bookings</span>
        </NavLink>
        <NavLink
          to="/dashboard/feedback"
          end
          className={({ isActive }) =>
            `flex items-center p-2 space-x-3 rounded-md hover:bg-[#256caa] hover:text-white ${
              isActive ? 'bg-[#256caa] text-white' : ''
            }`
          }
        >
          <i className="fa-solid fa-comment"></i>
          <span>Feedback</span>
        </NavLink>
        <NavLink
          to="/dashboard/settings"
          end
          className={({ isActive }) =>
            `flex items-center p-2 space-x-3 rounded-md hover:bg-[#256caa] hover:text-white ${
              isActive ? 'bg-[#256caa] text-white' : ''
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
