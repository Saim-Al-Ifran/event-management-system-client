// DashboardHome.tsx
import React from 'react';
import { useGetDashboardDataQuery } from '../../../features/Dashboard/dashboardApi';
import { FaCalendarCheck, FaUsers, FaMoneyBillAlt, FaList } from 'react-icons/fa';
import { Card, Typography } from '@material-tailwind/react';
import { FadeLoader } from 'react-spinners';
import DashboardChart from '../../../components/Dashboard/Chart/DashboardChart';
 

const DashboardHome: React.FC = () => {
  const { data: dashboardData,isLoading } = useGetDashboardDataQuery();
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FadeLoader color="#607D8B" size={50} {...(undefined as any)}/>
      </div>
    );
  }

  const { events, users, categories } = dashboardData;

  const chartData = [
    { name: 'Total', uv: events.total },
    { name: 'Active', uv: events.active },
    { name: 'Pending', uv: events.pending },
    { name: 'Completed', uv: events.completed },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Typography variant="h3" color="blue-gray" className="text-center mb-8" {...(undefined as any)}>
        Dashboard Overview
      </Typography>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Events Card */}
        <Card className="p-4 rounded-lg shadow-lg bg-pink-100" {...(undefined as any)}>
          <div className="flex items-center">
            <FaCalendarCheck className="text-pink-500 text-4xl mr-4" />
            <div>
              <Typography variant="h4" className="font-bold" {...(undefined as any)}>{events.total}</Typography>
              <Typography {...(undefined as any)}>Total Events</Typography>
              
            </div>
          </div>
        </Card>

        {/* Active Events Card */}
        <Card className="p-4 rounded-lg shadow-lg bg-yellow-100" {...(undefined as any)}>
          <div className="flex items-center">
            <FaCalendarCheck className="text-yellow-500 text-4xl mr-4" />
            <div>
              <Typography variant="h4" className="font-bold" {...(undefined as any)}>{events.active}</Typography>
              <Typography {...(undefined as any)}>Active Events</Typography>
        
            </div>
          </div>
        </Card>

        {/* Pending Events Card */}
        <Card className="p-4 rounded-lg shadow-lg bg-orange-100" {...(undefined as any)}>
          <div className="flex items-center">
            <FaCalendarCheck className="text-orange-500 text-4xl mr-4" />
            <div>
              <Typography variant="h4" className="font-bold" {...(undefined as any)}>{events.pending}</Typography>
              <Typography {...(undefined as any)}>Pending Events</Typography>
          
            </div>
          </div>
        </Card>

        {/* Completed Events Card */}
        <Card className="p-4 rounded-lg shadow-lg bg-blue-100" {...(undefined as any)}>
          <div className="flex items-center">
            <FaCalendarCheck className="text-blue-500 text-4xl mr-4" />
            <div>
              <Typography variant="h4" className="font-bold" {...(undefined as any)}>{events.completed}</Typography>
              <Typography {...(undefined as any)}>Completed Events</Typography>
        
            </div>
          </div>
        </Card>

        {/* Total Users Card */}
        <Card className="p-4 rounded-lg shadow-lg bg-green-100" {...(undefined as any)}>
          <div className="flex items-center">
            <FaUsers className="text-green-500 text-4xl mr-4" />
            <div>
              <Typography variant="h4" className="font-bold" {...(undefined as any)}>{users.total}</Typography>
              <Typography {...(undefined as any)}>Total Users</Typography>
              
            </div>
          </div>
        </Card>

        {/* Active Users Card */}
        <Card className="p-4 rounded-lg shadow-lg bg-teal-100" {...(undefined as any)}>
          <div className="flex items-center">
            <FaUsers className="text-teal-500 text-4xl mr-4" />
            <div>
              <Typography variant="h4" className="font-bold" {...(undefined as any)}>{users.active}</Typography>
              <Typography {...(undefined as any)}>Active Users</Typography>
             
            </div>
          </div>
        </Card>

        {/* Total Categories Card */}
        <Card className="p-4 rounded-lg shadow-lg bg-purple-100" {...(undefined as any)}>
          <div className="flex items-center">
            <FaList className="text-purple-500 text-4xl mr-4" />
            <div>
              <Typography variant="h4" className="font-bold" {...(undefined as any)}>{categories.total}</Typography>
              <Typography {...(undefined as any)}>Total Categories</Typography>
         
            </div>
          </div>
        </Card>

        {/* Total Revenue Card */}
        <Card className="p-4 rounded-lg shadow-lg bg-indigo-100" {...(undefined as any)}>
          <div className="flex items-center">
            <FaMoneyBillAlt className="text-indigo-500 text-4xl mr-4" />
            <div>
              <Typography variant="h4" className="font-bold" {...(undefined as any)}>${events.totalRevenue}</Typography>
              <Typography {...(undefined as any)}>Total Revenue</Typography>
               
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-8">
        <Typography variant="h4" color="blue-gray" className="text-center mb-4" {...(undefined as any)}>
          Event Statistics
        </Typography>
      
          <DashboardChart data={chartData} {...(undefined as any)} />
     
      </div>
      
      
    </div>
 
  );
};

export default DashboardHome;
