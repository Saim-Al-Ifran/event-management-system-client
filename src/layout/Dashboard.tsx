import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import TopNavBar from '../components/Dashboard/TopNavBar';
import Sidebar from '../components/Dashboard/Sidebar';
import { useGetDashboardDataQuery } from '../features/Dashboard/dashboardApi';

const Dashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {data:dashboardData} = useGetDashboardDataQuery()
  console.log(dashboardData);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col ">
        <TopNavBar toggleSidebar={toggleSidebar} />
        <div className="overflow-auto p-4 flex-1">
          <Outlet />
        </div>
      </div>
      {/* Overlay when sidebar is open on mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0  lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Dashboard;
